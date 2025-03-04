/** @type {import('tailwindcss').Config} */
export const colors = require("tailwindcss/colors");

module.exports = {
  presets: [require("nativewind/preset")], // 🔥 Certifique-se de usar este preset!
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500],
        secondary: colors.red[500],
        bgLight: colors.white,
        bgDark: "#282828",
        textPrimaryLight: colors.black,
        textPrimaryDark: colors.gray[200],
        textSecondaryLight: colors.gray[500],
        textSecondaryDark: colors.gray[200],
        cardLight: colors.gray[100],
        cardDark: "#363636",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
