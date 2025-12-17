/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0e1611",
        white: "#f7faf8",
        primary: "#ff5400",
        secondary: "#002aff",
        accent: "#4ff28e",
      },
    },
  },
  plugins: [],
};
