const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'ar',
      'bn',
      'da',
      'de',
      'en',
      'es',
      'fr',
      'hi',
      'it',
      'kn',
      'ml',
      'nl',
      'pl',
      'pt',
      'ru',
      'ta',
      'tr',
      'vi',
      'zh',
    ],
  },
  nsSeparator: '.',
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'modals', 'landing', 'dashboard', 'builder'],
};

module.exports = i18nConfig;
