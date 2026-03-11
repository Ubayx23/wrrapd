import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "wrrapd-navy": "#0a1f47",
        "wrrapd-gray": "#d8dfe9",
      },
      fontFamily: {
        space: ['"Space Grotesk"', "sans-serif"],
        dmsans: ['"DM Sans"', "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        poppins: ['"Poppins"', "sans-serif"],
        syne: ['"Syne"', "sans-serif"],
        outfit: ['"Outfit"', "sans-serif"],
        bebas: ['"Bebas Neue"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
