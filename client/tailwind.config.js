/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        volkhov: ["Volkhov", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#C22A54",
        secondary: "#202542",
        brand: {
          DEFAULT: "#C22A54",
          primary: "#C22A54",
          hover: "#A82046", // A darker shade for hover
          light: "#FDECF2", // A light shade for backgrounds
        },
      },
      animation: {
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
