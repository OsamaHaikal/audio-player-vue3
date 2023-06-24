// tailwind.config.js
/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#F14F68",
        black2: "#000000E5"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
