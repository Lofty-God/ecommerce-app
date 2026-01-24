/* @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [ 
    "bottom-[-5px]", 
    "right-[-5px]", 
  ],
  theme: {
    extend: {
      spacing: { 
        '1.25': '5px', 
      }
    },
  },
  plugins: [],
}