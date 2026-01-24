/* @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    safelist: [
    "bottom-[-5px]",
    "right-[-5px]",
    "absolute",
    "top-full",
    "right-0",
    "z-50",
    "bg-white",
    "shadow-lg",
    "rounded",
    "hover:text-black",
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