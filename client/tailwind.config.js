module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",

        //
        success: "#0ABB92",
        danger: "#D55438",
        info: "#44AEE4",
        warning: "#E7A61A",

        //
        "surface-light-1": "#ffffff",
        "surface-light-2": "#F8F8F8",
        "surface-light-3": "#e5e7eb",

        //
        "surface-dark-1": "#000000",
        "surface-dark-2": "#111111",
        "surface-dark-3": "#374151",
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover", "focus"],
    },
  },
  plugins: [],
};
