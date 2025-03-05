import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from 'store'; 

import en from './en.json';
import pt from './pt.json';


export type AvailableLanguages = 'en' | 'pt';


const resources: Record<AvailableLanguages, { translation: Record<string, string> }> = {
  en: { translation: en },
  pt: { translation: pt },
};


const getStoredLanguage = (): AvailableLanguages => {
  const state = store.getState(); 
  const storedLang = state.setting.language; 
  if (storedLang && (storedLang === 'en' || storedLang === 'pt')) {
    return storedLang;
  }
  return Localization.locale.startsWith('pt') ? 'pt' : 'en';
};


i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(), 
  fallbackLng: 'en', 
  interpolation: { escapeValue: false },
});


export const changeAppLanguage = (language: AvailableLanguages) => {
  store.dispatch({ type: 'setting/changeLanguage', payload: language }); 
  i18n.changeLanguage(language); 
};

export default i18n;
