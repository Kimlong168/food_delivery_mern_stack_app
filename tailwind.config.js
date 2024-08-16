/** @type {import('tailwindcss').Config} */
// import flowBitePlugin from 'flowbite/plugin';
// import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1350px",
      "2xl": "1736px", // Add a breakpoint named 2xl
      "3xl": "1920px", // Add a breakpoint named 3xl
    },
    extend: {
      fontFamily: {
        primary: ["ttnorms", "kantumruyPro"],
        "primary-bold": ["ttnormsBold", "kantumruyProBold"],
        secondary: ["kantumruyPro", "ttnorms"],
        "secondary-bold": ["kantumruyProBold", "ttnormsBold"],
      },
      colors: {
        primary: "#fa9f00",
        "primary-content": "A0A#00A",
        "primary-light": "#ffb32e",
        "primary-dark": "#c77f00",

        secondary: "#fac900",
        "secondary-content": "#313131",
        "secondary-dark": "#c7a000",
        "secondary-light": "#ffd62e",

        background: "#f1f0ee",
        foreground: "#fcfbfb",
        border: "#e2e0dc",

        copy: "#2a2722",
        "copy-light": "#70695c",
        "copy-lighter": "#988f81",

        success: "#00fa00",
        warning: "#fafa00",
        error: "#fa0000",

        "success-content": "#000000",
        "warning-content": "#000000",
        "error-content": "#fffafa",
      },
      backgroundImage: {
        heroBgImg: "url('./assets/header_img.png')",
      },
    },
  },
  plugins: [],
};
