module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'auto',

  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],
};
