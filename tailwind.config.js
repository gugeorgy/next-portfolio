const { colors } = require('./config.json');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        ...colors,
      },
    },
  },
  variants: {
    extends: {},
  },
  plugins: [],
};
