type SettingState = {
  showTabBar: boolean;
  theme: Theme;
  accentColor: AccentColor;
  colors: Palette;
};


type AccentColor = 'primary' | 'secondary' | 'thirth';
type Theme = 'dark' | 'light';

type Palette = {
  background: string;
  textPrimary: string;
  textSecondary: string;
  button: string;
  buttonText: string;
};
