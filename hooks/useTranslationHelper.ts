import { useTranslation } from 'react-i18next';

import en from '../locales/en.json';

export function p<T extends keyof typeof en>(key: T) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation();
  return t(key);
}
