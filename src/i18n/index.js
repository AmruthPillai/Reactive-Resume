import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import leftSidebarEn from './locales/en/leftSidebar.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      translations: leftSidebarEn,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

export default i18n;
