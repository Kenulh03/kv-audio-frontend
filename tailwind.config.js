/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#FBFBFB",
        secondary : "#E8F9FF",
        accent : "#367485"
      }
    },
  },
  plugins: [],
}