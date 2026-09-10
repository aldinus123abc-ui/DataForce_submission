/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFE9DC",
        paper2: "#E6DFCE",
        ink: "#211F1B",
        inkfaint: "#6B6459",
        cot: {
          DEFAULT: "#2E6E7E",
          soft: "#DCE9EA",
          line: "#1F4E5A",
        },
        latent: {
          DEFAULT: "#B8722E",
          soft: "#F2E1CC",
          line: "#8A5320",
        },
        bdh: {
          DEFAULT: "#6E3FC2",
          soft: "#E9E1F7",
          line: "#4F2C97",
        },
        signal: "#8B3A3A",
      },
      fontFamily: {
        display: ["\"Fraunces\"", "serif"],
        body: ["\"IBM Plex Sans\"", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};
