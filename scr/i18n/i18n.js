import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import english from './locals/english';
import hindi from './locals/hindi';

const resources = {
  en: { translation: english },
  hi: { translation: hindi },
};

const fallback = { languageTag: 'en', isRTL: false };

const languageTag =
  RNLocalize.findBestLanguageTag(Object.keys(resources))?.languageTag ||
  fallback.languageTag;

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
