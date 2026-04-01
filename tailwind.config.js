/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22C55E',
        secondary: '#F97316',
        danger: '#dc3545',
        success: '#198754',
        warning: '#ffc107',
        dark: '#212529',
      },
    },
  },
  plugins: [],
}
