import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './resources';

const languages = [
  {
    code: 'en',
    name: 'English',
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
