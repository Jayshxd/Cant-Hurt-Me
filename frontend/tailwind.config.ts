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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Cyberpunk theme colors
        "cyber-black": "#050505",
        "cyber-dark": "#0a0a0a",
        "cyber-cyan": "#00ffff",
        "cyber-cyan-dim": "#00cccc",
        "cyber-red": "#ff073a",
        "cyber-red-dim": "#cc0530",
        "cyber-amber": "#ffbf00",
        "cyber-amber-dim": "#cc9900",
        "cyber-green": "#00ff66",
        "cyber-purple": "#9d00ff",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.2)",
        "glow-red": "0 0 20px rgba(255, 7, 58, 0.3), 0 0 40px rgba(255, 7, 58, 0.2)",
        "glow-amber": "0 0 20px rgba(255, 191, 0, 0.3), 0 0 40px rgba(255, 191, 0, 0.2)",
        "glow-green": "0 0 20px rgba(0, 255, 102, 0.3), 0 0 40px rgba(0, 255, 102, 0.2)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "glitch": "glitch 1s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glitch": {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "92%": { transform: "translate(-2px, 1px)" },
          "94%": { transform: "translate(2px, -1px)" },
          "96%": { transform: "translate(-1px, 2px)" },
          "98%": { transform: "translate(1px, -2px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
