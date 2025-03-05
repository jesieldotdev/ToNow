import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from 'store';

import en from './en.json';
import pt from './pt.json';

// **Define os idiomas disponíveis**
export type AvailableLanguages = 'en' | 'pt';

// **Configuração dos recursos de tradução**
const resources = {
  en: { translation: en },
  pt: { translation: pt },
} as const;

// **Função para obter o idioma inicial**
const getStoredLanguage = (): AvailableLanguages => {
  const state = store.getState();
  const storedLang = state.setting.language;

  if (storedLang && (storedLang === 'en' || storedLang === 'pt')) {
    return storedLang as AvailableLanguages;
  }

  const deviceLocale = Localization.getLocales()[0]?.languageTag || 'en';
  return deviceLocale.startsWith('pt') ? 'pt' : 'en';
};

// **Inicializando o i18n com tipagem**
i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

// **Atualiza o idioma automaticamente quando o Redux muda**
store.subscribe(() => {
  const newLanguage = store.getState().setting.language;
  if (i18n.language !== newLanguage) {
    i18n.changeLanguage(newLanguage);
  }
});

export default i18n;
