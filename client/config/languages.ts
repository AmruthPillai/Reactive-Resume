export type Language = {
  code: string;
  name: string;
  localName?: string;
};

export const languages: Language[] = [
  { code: 'ar', name: 'Arabic', localName: 'اَلْعَرَبِيَّةُ' },
  { code: 'bn', name: 'Bengali', localName: 'বাংলা' },
  { code: 'da', name: 'Danish', localName: 'Dansk' },
  { code: 'de', name: 'German', localName: 'Deutsch' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish', localName: 'Español' },
  { code: 'fr', name: 'French', localName: 'Français' },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी' },
  { code: 'it', name: 'Italian', localName: 'Italiano' },
  { code: 'kn', name: 'Kannada', localName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', localName: 'മലയാളം' },
  { code: 'nl', name: 'Dutch', localName: 'Nederlands' },
  { code: 'pl', name: 'Polish', localName: 'Polski' },
  { code: 'ru', name: 'Russian', localName: 'русский' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ்' },
  { code: 'tr', name: 'Turkish', localName: 'Türkçe' },
  { code: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt' },
  { code: 'zh', name: 'Chinese', localName: '中文' },
].sort((a, b) => a.name.localeCompare(b.name));

export const languageMap: Record<string, Language> = languages.reduce(
  (acc, lang) => ({
    ...acc,
    [lang.code]: lang,
  }),
  {}
);
