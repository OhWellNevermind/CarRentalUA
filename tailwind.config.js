/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#121417",
        blue: "#3470FF",
        "dark-blue": "#0B44CD",
        gray: "rgba(18, 20, 23, 0.50)",
        border: "rgba(18, 20, 23, 0.10)",
        overlay: "rgba(18, 20, 23, 0.50)",
      },
    },
  },
  plugins: [],
};
