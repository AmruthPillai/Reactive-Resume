export type Language = {
  code: string;
  name: string;
  localName?: string;
};

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
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
