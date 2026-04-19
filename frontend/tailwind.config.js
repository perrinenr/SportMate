/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#000666",
        "primary-container": "#1a237e",
        "primary-fixed": "#e0e0ff",
        "primary-fixed-dim": "#bdc2ff",
        "secondary": "#5f00e3",
        "secondary-container": "#7836ff",
        "secondary-fixed": "#e9ddff",
        "secondary-fixed-dim": "#cfbcff",
        "tertiary": "#002108",
        "tertiary-container": "#003912",
        "tertiary-fixed": "#69ff87",
        "tertiary-fixed-dim": "#3ce36a",
        "background": "#fcf9f8",
        "surface": "#fcf9f8",
        "surface-dim": "#dcd9d9",
        "surface-bright": "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0edec",
        "surface-container-high": "#ebe7e7",
        "surface-container-highest": "#e5e2e1",
        "surface-variant": "#e5e2e1",
        "surface-tint": "#4c56af",
        "inverse-surface": "#313030",
        "inverse-on-surface": "#f3f0ef",
        "inverse-primary": "#bdc2ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#8690ee",
        "on-primary-fixed": "#000767",
        "on-primary-fixed-variant": "#343d96",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#eee4ff",
        "on-secondary-fixed": "#22005d",
        "on-secondary-fixed-variant": "#5400cc",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#00b048",
        "on-tertiary-fixed": "#002108",
        "on-tertiary-fixed-variant": "#00531e",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#454652",
        "on-background": "#1c1b1b",
        "outline": "#767683",
        "outline-variant": "#c6c5d4",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};
