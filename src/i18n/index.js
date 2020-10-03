import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const languages = [
  {
    code: 'ar',
    name: 'Arabic (عربى)',
  },
  {
    code: 'zh',
    name: 'Chinese Simplified (简体中文)',
  },
  {
    code: 'da',
    name: 'Danish (Dansk)',
  },
  {
    code: 'nl',
    name: 'Dutch (Nederlands)',
  },
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
    code: 'de',
    name: 'German (Deutsche)',
  },
  {
    code: 'ja',
    name: 'Japanese (日本人)',
  },
  {
    code: 'kn',
    name: 'Kannada (ಕನ್ನಡ)',
  },
  {
    code: 'nb',
    name: 'Norwegian (Norsk)',
  },
  {
    code: 'ptBr',
    name: 'Portuguese (Brazilian)',
  },
  {
    code: 'ptPt',
    name: 'Portuguese (Portugal)',
  },
  {
    code: 'es',
    name: 'Spanish (Español)',
  },
  {
    code: 'tr',
    name: 'Turkish (Türkçe)',
  },
];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
});

export { languages };

export default i18n;
