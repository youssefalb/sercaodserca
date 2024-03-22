// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importing translation files
import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';
import translationUA from './locales/ua/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  pl: {
    translation: translationPL
  },
  ua: {
    translation: translationUA
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more commonly set during user preference detection
    keySeparator: '.', // we will use keys like hero.title to make it more managable
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
