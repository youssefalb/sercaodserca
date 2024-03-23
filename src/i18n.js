// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

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
.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ['navigator'],
      caches: ['localStorage', 'cookie'], // Cache user language on
    },
    fallbackLng: 'ua', // default language
    resources,
    keySeparator: '.', // we will use keys like hero.title to make it more managable
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  }, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    console.log('i18next is ready. Language:', i18n.language);
  });

export default i18n;
