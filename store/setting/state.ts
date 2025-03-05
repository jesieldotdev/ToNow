export const initialSettingState = (): SettingState=>(
    {
      showTabBar: true,
      theme: "dark",
      accentColor: 'primary',
      colors: themes.light
    }
  )

  export const themes = {
    light: {
      background: "bg-bgLight",
      textPrimary: "text-textPrimaryLight",
      textSecondary: "text-textSecondaryLight",
      button: "bg-primary",
      buttonText: "text-white",
    },
    dark: {
      background: "bg-bgDark",
      textPrimary: "text-textPrimaryDark",
      textSecondary: "text-textSecondaryDark",
      button: "bg-primary",
      buttonText: "text-white",
    },
  };