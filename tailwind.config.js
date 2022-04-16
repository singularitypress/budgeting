module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-base": "#121212",
        "theme-dp01": "#1D1D1D",
        "theme-dp02": "#212121",
        "theme-dp03": "#242424",
        "theme-dp04": "#272727",
        "theme-dp06": "#2c2c2c",
        "theme-dp08": "#2d2d2d",
        "theme-dp12": "#323232",
        "theme-dp16": "#353535",
        "theme-dp24": "#373737",
        "theme-accent": "#faf9f5",
      },
      screens: {
        "min-hd": {
          raw: "(min-aspect-ratio: 16/9)",
        },
        "max-hd": {
          raw: "(max-aspect-ratio: 16/9)",
        },
      },
    },
  },
  plugins: [],
};
