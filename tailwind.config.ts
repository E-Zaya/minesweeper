import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Noto Serif JP", "serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      colors: {
        washi: {
          50: "#FDFAF4",
          100: "#F5F0E8",
          200: "#EBE3D5",
          300: "#D9CFC0",
          400: "#C4B89F",
          500: "#A89880",
        },
        sumi: {
          900: "#1A1A1A",
          800: "#242424",
          700: "#2E2E2E",
          600: "#3A3A3A",
          500: "#4A4A4A",
        },
        matcha: "#5C7A5C",
        sakura: "#C9828C",
        indigo: "#4A5FA8",
      },
    },
  },
  plugins: [],
};

export default config;
