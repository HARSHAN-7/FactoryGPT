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
          950: "#090a0c",
          900: "#11141a",
          850: "#161a23",
          800: "#1e2430",
          700: "#273042",
          600: "#3b475c",
          500: "#54647f",
          400: "#8393ad",
          300: "#b0bdd1",
          200: "#d3dbe6",
          100: "#f0f4f8",
        },
        accent: {
          orange: "#f97316",
          "orange-hover": "#ea580c",
          "orange-subtle": "rgba(249, 115, 22, 0.12)",
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
        'industrial-grid': "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
