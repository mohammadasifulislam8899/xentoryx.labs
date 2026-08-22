import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        "theme-primary": "var(--bg-primary)",
        "theme-secondary": "var(--bg-secondary)",
        "theme-card": "var(--bg-card)",
        "theme-text": "var(--text-primary)",
        "theme-muted": "var(--text-muted)",
        "theme-border": "var(--border-color)",
        "theme-subtle": "var(--border-subtle)",
        dark: {
          bg: "#0C0C0C",
          text: "#D7E2EA",
        },
      },
      fontFamily: {
        sans: ["var(--font-kanit)", "sans-serif"],
        kanit: ["var(--font-kanit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
