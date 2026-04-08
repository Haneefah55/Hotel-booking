 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,jsx}",
    "./src/components/**/*.{html,jsx,tsx}",
    "./src/pages/**/*.{html,jsx,tsx}",
    "./src/hooks/**/*.{html,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


