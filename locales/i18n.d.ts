import 'react-i18next';
import en from './en.json';

// 🔥 Gera automaticamente a tipagem baseada no JSON
type TranslationResources = typeof en;

// 🔥 Sobrescrevendo a tipagem do `react-i18next`
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: TranslationResources;
  }
}
