/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#A7A3FF',
        'white-purple': '#F0EFFF',
        'dark-purple': '#4D47C3',
      }
    },
  },
  plugins: [],
}
