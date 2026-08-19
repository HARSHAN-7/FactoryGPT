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
        background: "var(--background)",
        foreground: "var(--foreground)",
        industrial: {
          950: "#0b0c0e",
          900: "#14161f",
          850: "#1a1d28",
          800: "#222634",
          700: "#2d3345",
          600: "#414961",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#ffffff",
        },
        gold: {
          500: "#fbbf24",
          600: "#f59e0b",
          700: "#d97706",
          800: "#b45309",
          subtle: "rgba(251, 191, 36, 0.12)",
        },
        accent: {
          orange: "#f59e0b",
          "orange-hover": "#d97706",
          "orange-subtle": "rgba(245, 158, 11, 0.12)",
        },
        status: {
          online: "#10b981",
          processing: "#3b82f6",
          warning: "#f59e0b",
          error: "#ef4444",
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Consolas", "Courier New", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        'industrial-grid': "radial-gradient(circle, rgba(251, 191, 36, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
