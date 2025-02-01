/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          "-webkit-overflow-scrolling": "touch",
          "scrollbar-width": "none" /* Firefox */,
          "-ms-overflow-style": "none" /* IE and Edge */,
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, and Opera */,
        },
      });
    }),
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }
        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        white: "#f2f2f2",
        black: "#151312",
        gray: "#353334",
        graydark: "#1c1b1b",
        graylight: "#c7c7c7",
      },
      backgroundImage: {
        whitenoise: "url('/src/assets/whitenoise.png')",
        "custom-gradient":
          "linear-gradient(to right, #fbbf24, #fb923c, #ef4444)",
        "custom-gradient-with-opacity":
          "linear-gradient(to right, rgba(251, 191, 36, 0.85), rgba(251, 146, 60, 0.85), rgba(239, 68, 68, 0.85))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
