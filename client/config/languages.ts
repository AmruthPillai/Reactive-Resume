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
    code: 'kn',
    name: 'Kannada',
    localName: 'ಕನ್ನಡ',
  },
  {
    code: 'ta',
    name: 'Tamil',
    localName: 'தமிழ்',
  },
  {
    code: 'de',
    name: 'German',
    localName: 'Deutsch',
  },
];

export const languageMap: Record<string, Language> = languages.reduce(
  (acc, lang) => ({
    ...acc,
    [lang.code]: lang,
  }),
  {}
);
