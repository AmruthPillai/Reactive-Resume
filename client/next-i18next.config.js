const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['bn', 'da', 'de', 'en', 'es', 'fr', 'hi', 'it', 'kn', 'pl', 'ta', 'tr', 'zh'],
  },
  nsSeparator: '.',
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'modals', 'landing', 'dashboard', 'builder'],
};

module.exports = i18nConfig;
