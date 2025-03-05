/** @type {import('tailwindcss').Config} */
export const colors = require("tailwindcss/colors");

module.exports = {

  presets: [require("nativewind/preset")], 
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "text-primary-500",
    "text-secondary-500",
    "text-thirth-500",
    "bg-primary-500",
    "bg-secondary-500",
    "bg-thirth-500",
  ],
  theme: {
    extend: {
      colors: {
        // Tema padrão
        primary: '#3b82f6',
        secondary: colors.rose[500],
        thirth: colors.orange[500],
        bgLight: colors.white,
        bgDark: "#282828",
        textPrimaryLight: "#2A2A2A",
        textPrimaryDark: "#E0E0E0",
        textSecondaryLight: "#4B5563",
        textSecondaryDark: "#A1A1AA",
        cardLight: colors.gray[100],
        cardDark: "#363636",
        cardSecondaryLight: "#E5E7EB",
        cardSecondaryDark: "#323232",

      },
    },
  },
  darkMode: "class",
  plugins: [],
};
