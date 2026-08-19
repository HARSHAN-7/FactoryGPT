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
          950: "#f8fafc",
          900: "#ffffff",
          850: "#f1f5f9",
          800: "#e2e8f0",
          700: "#cbd5e1",
          600: "#94a3b8",
          500: "#64748b",
          400: "#475569",
          300: "#334155",
          200: "#1e293b",
          100: "#0f172a",
        },
        accent: {
          orange: "#ea580c",
          "orange-hover": "#c2410c",
          "orange-subtle": "rgba(234, 88, 12, 0.08)",
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
        'industrial-grid': "radial-gradient(circle, rgba(15,23,42,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
