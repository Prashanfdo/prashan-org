/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      mono: ['var(--font-roboto-mono)'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
