const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'ar',
      'bn',
      'cs',
      'da',
      'de',
      'el',
      'en',
      'es',
      'fa',
      'fr',
      'he',
      'hi',
      'hu',
      'id',
      'it',
      'kn',
      'ml',
      'nl',
      'or',
      'pl',
      'pt',
      'ru',
      'sv',
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
