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
          DEFAULT: "#3bbdf3",
          dark: "#2a9fd4",
          light: "#5cc9f5",
          muted: "#e0f5fc"
        },
        background: {
          DEFAULT: "#f8fafc"
        }
      },
      boxShadow: {
        glow: "0 10px 35px rgba(59, 189, 243, 0.15)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #e0f5fc 0%, #f8fafc 100%)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

