import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from './locales';

const languages = [
  {
    code: 'ar',
    name: 'Arabic (عربى)',
  },
  {
    code: 'bn',
    name: 'Bengali (বাংলা)',
  },
  {
    code: 'cs',
    name: 'Czech (čeština)',
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
    name: 'German (Deutsch)',
  },
  {
    code: 'el',
    name: 'Greek (Ελληνικά)',
  },
  {
    code: 'he',
    name: 'Hebrew (עִברִית)',
  },
  {
    code: 'hi',
    name: 'Hindi (हिंदी)',
  },
  {
    code: 'id',
    name: 'Indonesian (Bahasa Indonesia)',
  },
  {
    code: 'it',
    name: 'Italian (Italiano)',
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
    code: 'lt',
    name: 'Lithuanian (Lietuvių)',
  },
  {
    code: 'nb',
    name: 'Norwegian (Norsk)',
  },
  {
    code: 'fa',
    name: 'Persian (Farsi)',
  },
  {
    code: 'pl',
    name: 'Polish (Polskie)',
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
    code: 'ro',
    name: 'Romanian (Română)',
  },
  {
    code: 'ru',
    name: 'Russian (русский)',
  },
  {
    code: 'sk',
    name: 'Slovak (Slovenčina)',
  },
  {
    code: 'es',
    name: 'Spanish (Español)',
  },
  {
    code: 'sv',
    name: 'Swedish (Svenska)',
  },
  {
    code: 'tr',
    name: 'Turkish (Türkçe)',
  },
  {
    code: 'uk',
    name: 'Ukrainian (Українська)',
  },
];

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
});

export { languages };

export default i18n;
