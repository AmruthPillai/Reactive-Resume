import i18n from 'i18next';
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import resources from './locales';

const languages = [
  {
    code: 'ar',
    name: 'Arabic (عربى)',
  },
  {
    code: 'zh',
    name: 'Chinese (中文)',
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
    code: 'fr',
    name: 'French (Français)',
  },
  {
    code: 'de',
    name: 'German (Deutsche)',
  },
  {
    code: 'he',
    name: 'Hebrew (עברית)',
  },
  {
    code: 'hi',
    name: 'Hindi (हिन्दी)',
  },
  {
    code: 'it',
    name: 'Italian (Italiano)',
  },
  {
    code: 'kn',
    name: 'Kannada (ಕನ್ನಡ)',
  },
  {
    code: 'pl',
    name: 'Polish (Polskie)',
  },
  {
    code: 'pt',
    name: 'Portuguese (Português)',
  },
  {
    code: 'ru',
    name: 'Russian (русский)',
  },
  {
    code: 'es',
    name: 'Spanish (Español)',
  },
  {
    code: 'ta',
    name: 'Tamil (தமிழ்)',
  },
  {
    code: 'vi',
    name: 'Vietnamese (Tiếng Việt)',
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
