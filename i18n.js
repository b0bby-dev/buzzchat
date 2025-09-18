import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async cb => {
    try {
      const savedLang = await AsyncStorage.getItem('APP_LANGUAGE');
      if (savedLang) {
        cb(savedLang);
        return;
      }
    } catch (e) {
      console.log('Error reading language', e);
    }

    // fallback: device language
    const locales = RNLocalize.getLocales();
    cb(locales[0]?.languageCode || 'en');
  },
  init: () => {},
  cacheUserLanguage: async lang => {
    try {
      await AsyncStorage.setItem('APP_LANGUAGE', lang);
    } catch (e) {
      console.log('Error saving language', e);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
