/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./dist/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  plugins: [require("tailwindcss"), require("autoprefixer")],
  corePlugins: {
    transitionProperty: ["hover", "focus"],
  },
};
