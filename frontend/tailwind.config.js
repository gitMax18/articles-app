module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        hero: "url('/src/images/bg-bottom.svg')",
        connexion: "url('/src/images/connexion-bg.png')",
      }),

      height: {
        almost: "calc(100vh - 4rem)",
      },
      minHeight: {
        almost: "calc(100vh - 4rem)",
      },
      boxShadow: {
        1: " 0px 1px 4px rgba(0, 0, 0, 0.16)",
        2: " 0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
