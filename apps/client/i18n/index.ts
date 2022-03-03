import HttpBackend from 'i18next-http-backend';

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  debug: false,
  nsSeparator: '.',
  ns: ['common', 'modals', 'landing', 'dashboard', 'builder'],
  serializeConfig: false,
  use: [HttpBackend],
  backend: {
    loadPath: `${process.env.NEXT_PUBLIC_APP_URL}/locales/{{lng}}/{{ns}}.json`,
  },
};

export default i18nConfig;
