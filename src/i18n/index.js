import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const languages = [
  {
    code: 'en',
    name: 'English (US)',
  },
  {
    code: 'kn',
    name: 'Kannada (ಕನ್ನಡ)',
  },
];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
});

export { languages };

export default i18n;
