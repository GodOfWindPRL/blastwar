/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  theme: {
    borderRadius: {
      "8px": "8px",
      full: "999px",
    },
    screens: {
      min1200: {min: "1200px"},
      pc: "1416px",
      // => @media (max-width: 1535px) { ... }
      max1440: { max: "1440px" },
      max1280: { max: "1280px" },
      max1199: { max: "1199px" },
      // => @media (max-width: 1279px) { ... }
      max1024: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }
      max991: { max: "991px" },
      // => @media (max-width: 991px) { ... }
      max767: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      max667: { max: "667px" },
      // => @media (max-width: 667px) { ... }
      max639: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      max320: { max: "320px" },
      // => @media (max-width: 320px) { ... }
      min640: { min: "640px" },
      // => @media (min-width: 640) { ... }

      ...defaultTheme.screens,
    },
    colors: {
      transparent: "transparent",
      primary: "#E6F33F",
      primary2: "#FBFF22",
      black: "#000",
      black1: "#0C0B0D",
      gray1: "#19191E",
      gray2: "#272730",
      gray3: "#383841",
      gray4: "#D9D9D9",
      gray5: "#3F3F4D",
      lightGray: "#828282",
      lightWhite: "#E0E0E0",
      white: "#ffffff",
      red2: "#DC3030",
      green2: "#37C071",
    },
    fontFamily: {
      primary: ["Heebo-400", "sans-serif"],
    },
    fontSize: {
      xs: ["0.7rem", { lineHeight: "1rem" }], //14/20
      sm: ["0.77rem", { lineHeight: "1.17" }], //16/24
      base: ["1rem", { lineHeight: "1.17" }], //20/28
      lg: ["1.23rem", { lineHeight: "1.17" }, { fontWeight: "500" }], //24/32
      xl: ["1.538rem", { lineHeight: "1.17" }], //36/48
      xlg: ["1.75rem", { lineHeight: "1.17" }], //36/48
      13: ["13px", { lineHeight: "15.23px" }], //36/48
    },
    extend: {
      spacing: {
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        40: "40px",
      },
      borderRadius: {
        base: "6px",
        10: "10px",
        4: "4px",
      },
      gridTemplateColumns: {
        edit: "200px minmax(200px, 1fr)",
        "edit-mobile": "100px minmax(200px, 1fr)",
        position: "repeat(9, minmax(0, 1fr)) 3fr",
      },
    },
    minWidth: {
      "160px": "160px",
      "100px": "100px",
      "200px": "200px",
      376: "376px",
      88: "88px",
    },
    maxWidth: {
      "50%": "50%",
      "60%": "60%",
      "70%": "70%",
      "80%": "80%",
      "90%": "90%",
      full: "100%",
      "160px": "160px",
      "100px": "100px",
      "200px": "200px",
      376: "376px",
      88: "88px",
    },
    minHeight: {
      28: "28px",
      40: "40px",
      88: "88px",
    },
    height: {
      100: "100%",
    },
  },
  variants: {
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
};
