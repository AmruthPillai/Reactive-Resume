import i18n from 'i18next';
import backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import resources from './locales';

const languages = [
  {
    code: 'ar',
    name: 'Arabic',
  },
  {
    code: 'zh',
    name: 'Chinese',
  },
  {
    code: 'da',
    name: 'Danish',
  },
  {
    code: 'nl',
    name: 'Dutch',
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
  {
    code: 'pl',
    name: 'Polish',
  },
  {
    code: 'pt',
    name: 'Portuguese',
  },
  {
    code: 'es',
    name: 'Spanish',
  },
];

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['app', 'leftSidebar', 'rightSidebar'],
    defaultNS: 'app',
  });

export { languages };

export default i18n;
