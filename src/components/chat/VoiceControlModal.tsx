'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, Square, RefreshCw, 
  AlertCircle, CheckCircle2, Languages, ArrowRight, ShieldAlert 
} from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '@/lib/i18n/language-detector';
import { 
  FactorySpeechRecognizer, 
  speakText, 
  stopSpeechSynthesis, 
  isSpeechRecognitionSupported,
  VoiceState,
  VoiceError
} from '@/lib/voice/speech-service';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendQuery: (query: string, language: SupportedLanguage) => void;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function VoiceControlModal({
  isOpen,
  onClose,
  onSendQuery,
  selectedLanguage,
  onLanguageChange,
}: VoiceModalProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcriptText, setTranscriptText] = useState('');
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognizerRef = useRef<FactorySpeechRecognizer | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      recognizerRef.current = new FactorySpeechRecognizer(selectedLanguage);
    }
    return () => {
      stopSpeechSynthesis();
      if (recognizerRef.current) {
        recognizerRef.current.stopListening();
      }
    };
  }, [selectedLanguage]);

  const handleToggleListening = () => {
    setErrorMessage(null);

    if (voiceState === 'listening') {
      if (recognizerRef.current) {
        recognizerRef.current.stopListening();
      }
      setVoiceState('idle');
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setErrorMessage('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      setVoiceState('error');
      return;
    }

    if (!recognizerRef.current) {
      recognizerRef.current = new FactorySpeechRecognizer(selectedLanguage);
    } else {
      recognizerRef.current.setLanguage(selectedLanguage);
    }

    setTranscriptText('');
    setVoiceState('listening');

    recognizerRef.current.startListening(
      (text: string, isFinal: boolean) => {
        setTranscriptText(text);
        if (isFinal && text.trim().length > 0) {
          setVoiceState('processing');
          setTimeout(() => {
            handleSubmitVoiceQuery(text);
          }, 600);
        }
      },
      (error: VoiceError) => {
        setErrorMessage(error.message);
        setVoiceState('error');
      },
      (state: VoiceState) => {
        setVoiceState(state);
      }
    );
  };

  const handleSubmitVoiceQuery = (queryText: string) => {
    if (!queryText.trim()) return;
    if (recognizerRef.current) {
      recognizerRef.current.stopListening();
    }
    onSendQuery(queryText, selectedLanguage);
    onClose();
  };

  const handleStopSpeaking = () => {
    stopSpeechSynthesis();
    setVoiceState('idle');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        stopSpeechSynthesis();
        if (recognizerRef.current) recognizerRef.current.stopListening();
        onClose();
      }}
      title="Hands-Free Voice AI Assistant"
      description="Speech-to-Text Query & Neural Text-to-Speech Output"
    >
      <div className="space-y-6 text-center py-2">
        {/* Language Selector in Modal */}
        <div className="flex items-center justify-between p-3 bg-industrial-950 rounded border border-industrial-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-industrial-300">
            <Languages className="w-4 h-4 text-accent-orange" />
            <span>Voice Language:</span>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-industrial-900 border border-industrial-700 rounded px-2 py-1 text-white font-mono focus:outline-none focus:border-accent-orange cursor-pointer"
          >
            <option value="en">English (en-US)</option>
            <option value="ta">தமிழ் (ta-IN)</option>
            <option value="hi">हिन्दी (hi-IN)</option>
          </select>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-950/80 border border-red-800 rounded text-xs font-mono text-red-300 flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Interactive Microphone Button with Pulse Ring */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {voiceState === 'listening' && (
            <span className="absolute inset-0 rounded-full border-2 border-accent-orange animate-ping opacity-75" />
          )}

          <button
            onClick={handleToggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl ${
              voiceState === 'listening'
                ? 'bg-accent-orange text-white shadow-orange-500/40 scale-105'
                : voiceState === 'speaking'
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-industrial-950 border-2 border-industrial-700 text-industrial-300 hover:border-accent-orange hover:text-white'
            }`}
            title={voiceState === 'listening' ? 'Click to Stop Listening' : 'Click to Speak'}
          >
            {voiceState === 'listening' ? (
              <Mic className="w-10 h-10 animate-pulse" />
            ) : voiceState === 'speaking' ? (
              <Volume2 className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Status Indicator Pill */}
        <div>
          <Badge
            variant={
              voiceState === 'listening'
                ? 'orange'
                : voiceState === 'speaking'
                ? 'indexed'
                : voiceState === 'error'
                ? 'failed'
                : 'outline'
            }
            dot={voiceState === 'listening' || voiceState === 'speaking'}
          >
            {voiceState === 'listening'
              ? 'LISTENING... SPEAK NOW'
              : voiceState === 'processing'
              ? 'PROCESSING VOICE RAG...'
              : voiceState === 'speaking'
              ? 'SPEAKING RESPONSE...'
              : voiceState === 'error'
              ? 'VOICE ERROR'
              : 'IDLE - CLICK MIC TO SPEAK'}
          </Badge>
        </div>

        {/* Live Transcribed Speech Preview Box */}
        <div className="p-4 bg-industrial-950 rounded border border-industrial-800 text-left min-h-[70px] space-y-1">
          <div className="text-[10px] font-mono text-industrial-400 uppercase tracking-wider">
            Recognized Operator Speech:
          </div>
          <div className="text-sm font-sans text-white min-h-[30px] italic">
            {transcriptText ? `"${transcriptText}"` : <span className="text-industrial-600 font-mono text-xs">Waiting for speech input...</span>}
          </div>
        </div>

        {/* Control Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          {voiceState === 'speaking' ? (
            <Button variant="danger" className="w-full" onClick={handleStopSpeaking} icon={<Square className="w-4 h-4 fill-current" />}>
              Stop Speaking
            </Button>
          ) : transcriptText.trim() ? (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => handleSubmitVoiceQuery(transcriptText)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Submit Voice Question
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleToggleListening}
              icon={voiceState === 'listening' ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            >
              {voiceState === 'listening' ? 'Stop Listening' : 'Start Microphone'}
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
