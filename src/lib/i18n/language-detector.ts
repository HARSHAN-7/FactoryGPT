export type SupportedLanguage = 'en' | 'ta' | 'hi';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageInfo> = {
  en: { code: 'en', name: 'English', nativeName: 'English' },
  ta: { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  hi: { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
};

/**
 * Detects language script based on Unicode character ranges
 */
export function detectLanguageScript(text: string): SupportedLanguage {
  if (!text) return 'en';

  // Tamil script range: \u0B80-\u0BFF
  const tamilRegex = /[\u0B80-\u0BFF]/;
  // Devanagari (Hindi) script range: \u0900-\u097F
  const hindiRegex = /[\u0900-\u097F]/;

  let tamilCount = 0;
  let hindiCount = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (tamilRegex.test(char)) tamilCount++;
    if (hindiRegex.test(char)) hindiCount++;
  }

  if (tamilCount > 0 && tamilCount >= hindiCount) {
    return 'ta';
  }

  if (hindiCount > 0 && hindiCount > tamilCount) {
    return 'hi';
  }

  return 'en';
}

/**
 * Resolves final target language: Manual selection overrides auto-detection unless 'auto' is selected
 */
export function resolveTargetLanguage(userQuery: string, manualSelection: string): SupportedLanguage {
  if (manualSelection && manualSelection !== 'auto' && (manualSelection === 'en' || manualSelection === 'ta' || manualSelection === 'hi')) {
    return manualSelection as SupportedLanguage;
  }

  return detectLanguageScript(userQuery);
}
