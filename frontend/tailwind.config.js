/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui", {
      themes: [
        "light", // Apply the light mode theme from DaisyUI
      ],
    }),
  ],
};
