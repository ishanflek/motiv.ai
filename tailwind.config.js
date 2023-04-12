/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    "extend": {
      "colors": {
        "white": {
          "0": "#ffffffff",
          "1": "#ffffff"
        },
        "stone": {
          "900": "#1c1c1cff"
        },
        "zinc": {
          "50": "#fcfcfcff"
        }
      }
    }
  },
  plugins: [],
}
