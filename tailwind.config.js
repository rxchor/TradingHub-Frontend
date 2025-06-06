/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#ffe5eb',
          100: '#fbb8c5',
          200: '#f28da2',
          300: '#e86380',
          400: '#de395e',
          500: '#dc143c',
          600: '#b01034',
          700: '#850c2a',
          800: '#5a081f',
          900: '#2f0412',
          950: '#170209',
        },
        midnight: {
          50: '#e5e5ec',
          100: '#bfbfd3',
          200: '#9999b9',
          300: '#73739f',
          400: '#4d4d86',
          500: '#27276c',
          600: '#1f1f55',
          700: '#18183f',
          800: '#202030',
          850: '#0f0f24',
          900: '#0F0F20',
          950: '#070712',
        },
      },
    },
  },
  plugins: [],
}
