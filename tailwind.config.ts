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
        brand: {
          obsidian: "#070807",
          espresso: "#1F1C18",
          crimson: "#DD423F",
          gold: "#E1C499",
          platinum: "#E2E8F0",
          emerald: "#10B981",
        },
        status: {
          success: "#059669",
          error: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.00rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1.00rem", { lineHeight: "1.50rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.50rem", { lineHeight: "2.00rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3.00rem", { lineHeight: "3.50rem" }],
        "6xl": ["3.75rem", { lineHeight: "4.25rem" }],
        "7xl": ["4.50rem", { lineHeight: "5.00rem" }],
      },
    },
  },
  plugins: [],
};

export default config;
