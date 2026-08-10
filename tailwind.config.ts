import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0F1115",
        foreground: "#F5F5F5",
        surface: {
          DEFAULT: "#161920",
          hover: "#1E222D",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          red: "#DB4338",
          redGlow: "rgba(219, 67, 56, 0.4)",
          redLight: "#FF5E50",
          dark: "#0F1115",
          muted: "#A0A0A0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "glow-red": "0 0 35px -5px rgba(219, 67, 56, 0.4)",
        "glow-red-lg": "0 0 60px -10px rgba(219, 67, 56, 0.6)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-red": "0 8px 32px 0 rgba(219, 67, 56, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-glow": "pulseGlow 3s infinite ease-in-out",
        "orbit-spin": "orbitSpin 20s linear infinite",
        "orbit-reverse": "orbitSpin 25s linear infinite reverse",
        "float": "floatAnim 4s ease-in-out infinite",
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 30s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        orbitSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatAnim: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
