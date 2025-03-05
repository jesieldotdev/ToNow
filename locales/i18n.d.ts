import 'react-i18next';
import en from './en.json';

// 🔥 Cria um tipo baseado nas chaves do JSON de tradução
type TranslationResources = typeof en;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResources;
    };
  }
}
