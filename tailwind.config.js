/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1B1B1B",
        light: "#EEEDDE",
        primary: "#B63E96",
      },
    },
  },
  plugins: [],
}

