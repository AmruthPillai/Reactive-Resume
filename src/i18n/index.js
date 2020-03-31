import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'fr',
    name: 'French',
  },
  {
    code: 'hi',
    name: 'Hindi',
  },
  {
    code: 'kn',
    name: 'Kannada',
  },
];

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
  debug: true,
  ns: ['app', 'leftSidebar', 'rightSidebar'],
  defaultNS: 'app',
});

export { languages };

export default i18n;
