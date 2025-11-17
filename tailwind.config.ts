import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ff6f91",
          dark: "#c74166",
          light: "#ff9bb5"
        }
      },
      boxShadow: {
        glow: "0 10px 35px rgba(255, 111, 145, 0.35)"
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #ffd6e3 0%, #f1f5f9 100%)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

