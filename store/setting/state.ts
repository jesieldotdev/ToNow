export const initialSettingState = (): SettingState => ({
  showTabBar: true,
  theme: 'dark',
  accentColor: 'secondary',
  colors: themes.dark,
  language: 'en'
});

export const themes = {
  light: {
    primary: 'blue-500',
    background: 'bg-bgLight',
    textPrimary: 'text-textPrimaryLight',
    textSecondary: 'text-primary',
    button: 'bg-primary',
    buttonText: 'text-white',
    textHighlight: 'text-secondary',
  },
  dark: {
    primary: 'blue-500',
    background: 'bg-bgDark',
    backgroundPrimary: 'bg-blue-500',
    textPrimary: 'text-textPrimaryDark',
    textSecondary: 'text-textSecondaryDark',
    button: 'bg-primary',
    buttonText: 'text-white',
    textHighlight: 'text-primary',
  },
} as const;

// 🔹 Aqui o TypeScript infere automaticamente o tipo baseado no `themes`
export type Palette = typeof themes.light; // 🔥 Agora temos um tipo nomeado!
export type ThemeKeys = keyof typeof themes; // "light" | "dark"
