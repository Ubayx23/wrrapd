import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "wrrapd-navy": "#FFFFFF",
        "wrrapd-gray": "#07070F",
        "wrrapd-purple": "#4C3D8F",
        "wrrapd-accent": "#7B68EE",
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    base: false,
  },
};

export default config;
