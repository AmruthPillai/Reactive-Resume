import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales';

const languages = [
  {
    code: 'zh',
    name: 'Chinese',
  },
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'fr',
    name: 'French',
  },
  {
    code: 'de',
    name: 'German',
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
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['app', 'leftSidebar', 'rightSidebar'],
  defaultNS: 'app',
});

export { languages };

export default i18n;
