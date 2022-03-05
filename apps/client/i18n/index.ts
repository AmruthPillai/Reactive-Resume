import { UserConfig } from 'next-i18next';
import { join } from 'path';

const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  debug: false,
  nsSeparator: '.',
  localePath: join(__dirname, '../../../public/locales'),
  ns: ['common', 'modals', 'landing', 'dashboard', 'builder'],
};

export default i18nConfig;
