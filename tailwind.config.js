/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        amsterdam: ['New Amsterdam', 'sans-serif'],
      },
      colors: {
        baseTeal: '#00b29f',
        baseGreen: '#24ce70',
      },
    },
  },
  plugins: [require('daisyui')],
};
