/** @type {import('tailwindcss').Config} */
export const colors = require('tailwindcss/colors');

module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    'text-primary-500',
    'text-secondary-500',
    'text-third-500',
    'bg-primary-500',
    'bg-secondary-500',
    'bg-third-500',
    'border-primary-500',
    'border-secondary-500',
    'border-third-500',
    'text-primary',
    'text-secondary',
    'text-third',
    'bg-primary',
    'bg-secondary',
    'bg-third',
    'border-primary',
    'border-secondary',
    'border-third',
    'textPrimaryLight',
    'textSecondaryLight',
    'textSecondaryDark',
    'textSecondaryLight',
    'text-gray-100',
  ],

  theme: {
    extend: {
      colors: {
        primary: colors.rose[500], // Vermelho Rosado
        secondary: colors.blue[500], // Azul #3b82f6
        third: colors.orange[500], // Amarelo para melhor contraste
        bgLight: colors.gray[100], // Tom neutro mais agradável
        bgDark: colors.gray[900], // Fundo escuro mais sólido
        textPrimaryLight: colors.gray[800], // Mantém um bom contraste
        textPrimaryDark: colors.gray[100], // Branco suave para dark mode
        textSecondaryLight: colors.gray[500], // Cinza médio para contraste leve
        textSecondaryDark: colors.gray[300], // Tom mais claro no dark mode
        cardLight: colors.gray[200], // Cartão claro mais neutro
        cardDark: colors.gray[800], // Cartão escuro mais consistente
        cardSecondaryLight: colors.gray[300], // Melhor contraste para elementos secundários
        cardSecondaryDark: colors.gray[700], // Melhor tom para dark mode
      },
    },
  },

  darkMode: 'class',
  plugins: [],
};
