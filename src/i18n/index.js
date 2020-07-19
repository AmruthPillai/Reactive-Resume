import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const languages = [
  {
    code: 'en',
    name: 'English (US)',
  },
  {
    code: 'fi',
    name: 'Finnish (Suomalainen)',
  },
  {
    code: 'fr',
    name: 'French (Français)',
  },
  {
    code: 'kn',
    name: 'Kannada (ಕನ್ನಡ)',
  },
  {
    code: 'ptBr',
    name: 'Portuguese (Brazilian)',
  },
  {
    code: 'es',
    name: 'Spanish (Español)',
  },
];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
});

export { languages };

export default i18n;
