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
        primary: colors.blue[500], // Azul semelhante ao #3b82f6
        secondary: colors.rose[500], // Já estava correto
        thirth: colors.orange[500], // Já estava correto
        bgLight: colors.white, // Já estava correto
        bgDark: colors.gray[800], // Aproximado de #282828
        textPrimaryLight: colors.gray[800], // Aproximado de #2A2A2A
        textPrimaryDark: colors.gray[200], // Aproximado de #E0E0E0
        textSecondaryLight: colors.gray[600], // Aproximado de #4B5563
        textSecondaryDark: colors.gray[400], // Aproximado de #A1A1AA
        cardLight: colors.gray[100], // Já estava correto
        cardDark: colors.gray[700], // Aproximado de #363636
        cardSecondaryLight: colors.gray[200], // Aproximado de #E5E7EB
        cardSecondaryDark: colors.gray[700], // Aproximado de #323232
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
