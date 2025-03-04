/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./App.tsx", "./screens/**/*.{tsx,js}", "./components/**/*.{tsx,js}"],
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
