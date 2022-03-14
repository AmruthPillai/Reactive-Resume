export type Language = {
  code: string;
  name: string;
  localName?: string;
};

export const languages: Language[] = [
  {
    code: 'bn',
    name: 'Bengali',
    localName: 'বাংলা',
  },
  {
    code: 'zh',
    name: 'Chinese',
    localName: '中文',
  },
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'fr',
    name: 'French',
    localName: 'Français',
  },
  {
    code: 'de',
    name: 'German',
    localName: 'Deutsch',
  },
  {
    code: 'hi',
    name: 'Hindi',
    localName: 'हिन्दी',
  },
  {
    code: 'it',
    name: 'Italian',
    localName: 'Italiano',
  },
  {
    code: 'kn',
    name: 'Kannada',
    localName: 'ಕನ್ನಡ',
  },
  {
    code: 'es',
    name: 'Spanish',
    localName: 'Español',
  },
  {
    code: 'ta',
    name: 'Tamil',
    localName: 'தமிழ்',
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const languageMap: Record<string, Language> = languages.reduce(
  (acc, lang) => ({
    ...acc,
    [lang.code]: lang,
  }),
  {}
);
