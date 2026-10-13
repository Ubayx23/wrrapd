import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5EEE2",
        surface: "#FBF7EF",
        line: "#E4DAC8",
        ink: { DEFAULT: "#1D1B26", 2: "#5B5867", 3: "#8E8A98" },
        lavender: { DEFAULT: "#7C6FD0", light: "#C9C0F2" },
        night: "#2A2540",
        peach: "#E9A27F",
        sage: "#A9BFA0",
        // One per field. Only for dots, map nodes, lines and small chips, never text.
        field: {
          neuroscience: "#6E9BD8",
          psychology: "#7C6FD0",
          philosophy: "#E9A27F",
          religion: "#8FAF86",
        },
      },
      keyframes: {
        "nav-in": { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(0)" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "node-pulse": { "0%, 100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.04)" } },
      },
      animation: {
        "nav-in": "nav-in 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "node-pulse": "node-pulse 3s ease-in-out infinite",
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
