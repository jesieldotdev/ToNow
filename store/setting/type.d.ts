type SettingState = {
  showTabBar: boolean;
  theme: Theme;
  accentColor: AccentColor;
  colors: Palette;
};

type SettingItem = object;

type AccentColor = 'primary' | 'secondary' | 'third';
type Theme = 'dark' | 'light';

type Palette = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  button: string;
  buttonText: string;
};
