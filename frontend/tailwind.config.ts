import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDFAF6",
        beige: {
          50: "#FDFAF6",
          100: "#F5ECD7",
          200: "#EDD9B7",
          300: "#E0C49A",
          400: "#D4A574",
          500: "#C4956A",
        },
        brown: {
          50: "#FAF5EE",
          100: "#F0E6D3",
          200: "#E8D5B7",
          300: "#D4B896",
          400: "#C4956A",
          500: "#A67C52",
          600: "#8B5E3C",
          700: "#6B4226",
          800: "#5C3D2E",
          900: "#2C1810",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      boxShadow: {
        warm: "0 2px 16px 0 rgba(107,66,38,0.08)",
        "warm-md": "0 4px 24px 0 rgba(107,66,38,0.12)",
        "warm-lg": "0 8px 40px 0 rgba(107,66,38,0.16)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
