const path = require('path');

const i18nConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en', 'kn', 'ta', 'hi'],
  },
  nsSeparator: '.',
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'modals', 'landing', 'dashboard', 'builder'],
};

module.exports = i18nConfig;
