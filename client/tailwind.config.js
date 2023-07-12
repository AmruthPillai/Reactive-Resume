const { join } = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx,css,scss}'),
    join(__dirname, 'config/**/*.{js,ts,jsx,tsx,css,scss}'),
    join(__dirname, 'modals/**/*.{js,ts,jsx,tsx,css,scss}'),
    join(__dirname, 'templates/**/*.{js,ts,jsx,tsx,css,scss}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx,css,scss}'),
    join(__dirname, 'utils/**/*.{js,ts,jsx,tsx,css,scss}'),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      'ibm-plex-sans': ['IBM Plex Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.teal,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
