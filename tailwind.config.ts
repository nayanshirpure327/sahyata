import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Deep Trust Blue
          dark: "#1D4ED8",
          light: "#3B82F6",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        secondary: {
          DEFAULT: "#0EA5E9", // Fresh Sky Blue
          50: "#F0F9FF",
          100: "#E0F2FE",
          500: "#0EA5E9",
          600: "#0284C7",
        },
        accent: {
          DEFAULT: "#F59E0B", // Warm Amber CTA
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
        },
        success: {
          DEFAULT: "#10B981", // Emerald
          50: "#ECFDF5",
          500: "#10B981",
          600: "#059669",
        },
        danger: {
          DEFAULT: "#EF4444", // Soft Red
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
        surface: {
          DEFAULT: "#F8FAFC", // Cool Off-white
          dark: "#0F172A",
        },
        slate: {
          900: "#0F172A", // Main Text
          500: "#64748B", // Muted Text
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;