import { useSelector } from 'react-redux';

export function useTheme(): Palette {
  const colors = useSelector((state: RootState) => state.setting.colors);
  return colors;
}
