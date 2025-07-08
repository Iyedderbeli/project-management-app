/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // optional
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
