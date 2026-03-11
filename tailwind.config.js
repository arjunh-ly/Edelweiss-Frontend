/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#034EA2",
        accent: "#8DC63F",
      },
    },
  },
  plugins: [],
};
