/**
 * @type {import('next-i18next').UserConfig}
 **/
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  debug: false,
  nsSeparator: '.',
  initImmediate: false,
  localePath: './apps/client/public/locales',
  ns: ['common', 'modals', 'landing', 'dashboard', 'builder'],
};
