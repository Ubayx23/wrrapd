import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#f7efbd", hi: "#fbf6d6" },
        margin: "rgba(206,92,92,.32)",
        ink: { DEFAULT: "#1e2a3f", 2: "#4b5669", 3: "#7c8391" },
        hl: {
          blue: "#a5c9ef",
          purple: "#ccb0f0",
          orange: "#f6ae88",
          green: "#bfdf99",
          pink: "#f3aad9",
        },
        strand: { fill: "#8fb2f0", edge: "#c46fd1" },
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Iowan Old Style", "Georgia", "serif"],
        body: ["var(--font-figtree)", "ui-sans-serif", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "Bradley Hand", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
