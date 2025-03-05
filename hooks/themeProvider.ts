import { useSelector } from 'react-redux';
import { themes } from 'store/setting/state';

import useStore from './useStore';

export function useTheme() {
  const [, , select] = useStore();
  const theme = select('setting.theme'); // 🔥 Atualiza quando o Redux muda
  return themes[theme];
}
