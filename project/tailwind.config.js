/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#e2642a',
        'brand-orange-dark': '#d55a26',
        'brand-orange-light': '#f97316',
      }
    },
  },
  plugins: [],
};
