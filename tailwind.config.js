/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        textPrimary: "var(--text-primary)",
        text1: "var(--text-1)",
        accent1: "var(--accent-1)",
        bg10: "var(--bg-10)",
        bg15: "var(--bg-15)",
        bg20: "var(--bg-20)",
        bg25: "var(--bg-25)",
      }
    },
  },
  plugins: [],
};
