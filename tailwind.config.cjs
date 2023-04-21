/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        epablue: "#0E6CB6",
        epalightblue: "#C9F0EE",
        epasagegreen: "#DBDEC9",
        epaolivegreen: "#C9CFA6",
        epagreen: "#62C342",
        blackolive: "#3A3E3B",
        eerieblack: "#23231A",
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('open', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`open${separator}${className}`)}:open`
        })
      })
    })
  ],
  darkMode: 'class',
}
