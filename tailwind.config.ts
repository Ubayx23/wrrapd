import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FBFAF7",
        surface: "#FFFFFF",
        line: "#ECE8E1",
        ink: { DEFAULT: "#1D1B26", 2: "#5B5867", 3: "#8E8A98" },
        lavender: "#7C6FD0",
        peach: "#E9A27F",
        sage: "#A9BFA0",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        body: ["var(--font-figtree)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
