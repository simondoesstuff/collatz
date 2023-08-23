/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: [
      "dracula",
      "pastel",
    ],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
}

