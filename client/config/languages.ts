export type Language = {
  code: string;
  name: string;
  localName?: string;
  isRTL?: boolean;
};

export const languages: Language[] = [
  { code: 'am', name: 'Amharic', localName: 'አማርኛ' },
  { code: 'ar', name: 'Arabic', localName: 'اَلْعَرَبِيَّةُ', isRTL: true },
  { code: 'bg', name: 'Bulgarian', localName: 'български' },
  { code: 'bn', name: 'Bengali', localName: 'বাংলা' },
  { code: 'ca', name: 'Catalan', localName: 'Valencian' },
  { code: 'cs', name: 'Czech', localName: 'čeština' },
  { code: 'da', name: 'Danish', localName: 'Dansk' },
  { code: 'de', name: 'German', localName: 'Deutsch Formell / Sie' },
  { code: 'el', name: 'Greek', localName: 'Ελληνικά' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish', localName: 'Español' },
  { code: 'fa', name: 'Persian', localName: 'فارسی', isRTL: true },
  { code: 'fi', name: 'Finnish', localName: 'Suomi' },
  { code: 'fr', name: 'French', localName: 'Français' },
  { code: 'he', name: 'Hebrew', localName: 'Ivrit', isRTL: true },
  { code: 'hi', name: 'Hindi', localName: 'हिन्दी' },
  { code: 'hu', name: 'Hungarian', localName: 'Magyar' },
  { code: 'id', name: 'Indonesian', localName: 'Bahasa Indonesia' },
  { code: 'it', name: 'Italian', localName: 'Italiano' },
  { code: 'ja', name: 'Japanese', localName: '日本語' },
  { code: 'km', name: 'Khmer', localName: 'ភាសាខ្មែរ' },
  { code: 'kn', name: 'Kannada', localName: 'ಕನ್ನಡ' },
  { code: 'ko', name: 'Korean', localName: '한국어' },
  { code: 'ml', name: 'Malayalam', localName: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', localName: 'मराठी' },
  { code: 'ne', name: 'Nepali', localName: 'नेपाली' },
  { code: 'nl', name: 'Dutch', localName: 'Nederlands' },
  { code: 'no', name: 'Norwegian', localName: 'Norsk' },
  { code: 'or', name: 'Odia', localName: 'ଓଡ଼ିଆ' },
  { code: 'pl', name: 'Polish', localName: 'Polski' },
  { code: 'pt', name: 'Portuguese', localName: 'Português' },
  { code: 'pt-BR', name: 'Brazilian Portuguese', localName: 'Brasil' },
  { code: 'ro', name: 'Romanian', localName: 'limba română' },
  { code: 'ru', name: 'Russian', localName: 'русский' },
  { code: 'sr', name: 'Serbian', localName: 'српски језик' },
  { code: 'sv', name: 'Swedish', localName: 'Svenska' },
  { code: 'ta', name: 'Tamil', localName: 'தமிழ்' },
  { code: 'tr', name: 'Turkish', localName: 'Türkçe' },
  { code: 'uk', name: 'Ukranian', localName: 'Українська мова' },
  { code: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt' },
  { code: 'zh', name: 'Chinese', localName: '中文' },
].sort((a, b) => a.name.localeCompare(b.name));

export const languageMap: Record<string, Language> = languages.reduce(
  (acc, lang) => ({
    ...acc,
    [lang.code]: lang,
  }),
  {},
);
