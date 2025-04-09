/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: "#121F2F", // Legacy primary
        secondary: "#3DD598", // Keep the green color for buttons
        dark: "#0D1B2A",
        light: "#F9F9F9",

        // New color definitions as per requirements
        "hero-bg": "rgb(6 4 31)", // Hero section background
        "stats-bg": "rgb(32 60 91)", // Vonoy in numbers section
        "footer-bg": "rgb(12 29 44)", // Footer background
        highlight: "#0a6dc2", // Highlight color
      },
    },
  },
  plugins: [import("@tailwindcss/aspect-ratio")],
};
