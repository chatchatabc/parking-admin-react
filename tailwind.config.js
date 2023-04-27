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
        text1: "var(--text1)",
        text2: "var(--text2)",
        text3: "var(--text3)",
        text4: "var(--text4)",
        accent1: "var(--accent1)",
        bg0: "var(--bg0)",
        bg1: "var(--bg1)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        bg4: "var(--bg4)",
        bg5: "var(--bg5)",
        bg6: "var(--bg6)",
        bg7: "var(--bg7)",
        bg8: "var(--bg8)",
        bg9: "var(--bg9)",
      }
    },
  },
  plugins: [],
};
