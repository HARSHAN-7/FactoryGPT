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
          950: "#ffffff", // Pure Crisp White
          900: "#f8fafc", // Very Light Slate
          850: "#f1f5f9", // Soft Light Gray
          800: "#e2e8f0", // Light Border Gray
          700: "#cbd5e1", // Slate Gray Border
          600: "#94a3b8", // Subtitle Gray
          500: "#64748b", // Body Text Gray
          400: "#334155", // Dark Slate Text
          300: "#1e293b", // Deep Charcoal Text
          200: "#0f172a", // High Contrast Black
          100: "#020617", // Pure Black
        },
        gold: {
          500: "#d97706",
          600: "#d97706",
          700: "#b45309",
          800: "#78350f",
          subtle: "rgba(217, 119, 6, 0.12)",
        },
        accent: {
          orange: "#d97706",
          "orange-hover": "#b45309",
          "orange-subtle": "rgba(217, 119, 6, 0.12)",
        },
        status: {
          online: "#059669",
          processing: "#2563eb",
          warning: "#d97706",
          error: "#dc2626",
        }
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Consolas", "Courier New", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      backgroundImage: {
        'industrial-grid': "radial-gradient(circle, rgba(15, 23, 42, 0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
