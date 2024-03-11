/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
         colors: {
        'yellow': '#FED67A', 
        'purple': '#766DF1',
        'black': '#222222', 
      },

    },
  },
  plugins: [],
}

