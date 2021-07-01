module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['"Poppins"', "serif"],
    },
    rotate: {
      "-180": "-180deg",
      "-90": "-90deg",
      "-45": "-45deg",
      0: "0",
      45: "45deg",
      90: "90deg",
      135: "135deg",
      180: "180deg",
      270: "270deg",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["group-focus"],
      textColor: ["group-focus"],
    },
  },
  plugins: [],
};
