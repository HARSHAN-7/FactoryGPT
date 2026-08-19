import { SupportedLanguage } from '../i18n/language-detector';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export interface VoiceError {
  type: 'permission-denied' | 'unsupported-browser' | 'no-speech' | 'network' | 'unknown';
  message: string;
}

const VOICE_LANG_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  ta: 'ta-IN',
  hi: 'hi-IN',
};

/**
 * Checks if browser supports Web Speech API Recognition
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  );
}

/**
 * Checks if browser supports Speech Synthesis (TTS)
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

/**
 * Web Speech Recognition Manager
 */
export class FactorySpeechRecognizer {
  private recognition: any = null;
  private lang: string = 'en-US';

  constructor(language: SupportedLanguage = 'en') {
    if (isSpeechRecognitionSupported()) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.setLanguage(language);
    }
  }

  public setLanguage(language: SupportedLanguage) {
    this.lang = VOICE_LANG_MAP[language] || 'en-US';
    if (this.recognition) {
      this.recognition.lang = this.lang;
    }
  }

  public startListening(
    onResult: (text: string, isFinal: boolean) => void,
    onError: (error: VoiceError) => void,
    onStateChange: (state: VoiceState) => void
  ) {
    if (!this.recognition) {
      onError({
        type: 'unsupported-browser',
        message: 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.',
      });
      return;
    }

    try {
      this.recognition.onstart = () => {
        onStateChange('listening');
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        onResult(currentText, Boolean(finalTranscript));
      };

      this.recognition.onerror = (event: any) => {
        let errType: VoiceError['type'] = 'unknown';
        let errMsg = 'Speech recognition error occurred.';

        if (event.error === 'not-allowed') {
          errType = 'permission-denied';
          errMsg = 'Microphone access was denied. Please allow microphone permissions in your browser settings.';
        } else if (event.error === 'no-speech') {
          errType = 'no-speech';
          errMsg = 'No speech detected. Please speak into your microphone.';
        } else if (event.error === 'network') {
          errType = 'network';
          errMsg = 'Network error during speech recognition.';
        }

        onStateChange('error');
        onError({ type: errType, message: errMsg });
      };

      this.recognition.onend = () => {
        onStateChange('idle');
      };

      this.recognition.start();
    } catch (e: any) {
      onStateChange('error');
      onError({
        type: 'unknown',
        message: e?.message || 'Could not start microphone.',
      });
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore if already stopped
      }
    }
  }
}

/**
 * Text-to-Speech (TTS) Speech Synthesizer
 */
export function speakText(
  text: string,
  language: SupportedLanguage = 'en',
  onEnd?: () => void
): boolean {
  if (!isSpeechSynthesisSupported()) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Strip markdown formatting for cleaner audio playback
    const cleanText = text
      .replace(/[#*`_>~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .slice(0, 350); // Limit playback length for plant floor clarity

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLangCode = VOICE_LANG_MAP[language] || 'en-US';
    utterance.lang = targetLangCode;
    utterance.rate = 0.95; // Slightly measured rate for technical clarity

    // Match matching browser voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang.startsWith(targetLangCode.split('-')[0]));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('TTS playback error:', err);
    return false;
  }
}

/**
 * Stop any active TTS audio playback
 */
export function stopSpeechSynthesis() {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }
  }
}
