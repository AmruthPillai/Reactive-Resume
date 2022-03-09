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
];

export const languageMap: Record<string, Language> = languages.reduce(
  (acc, lang) => ({
    ...acc,
    [lang.code]: lang,
  }),
  {}
);
