/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'yellow': '#FED67A', 
        'purple': '#766DF1',
        'black': '#222222', 
      },
       width: {
        '3/10': '30%',
        '7/10': '70%',
      },
      // Now all text elements use this font
      fontFamily: {
        sans: ['"e-Ukraine"', 'sans-serif'],
      },
      // // Customize your typography here
      // fontFamily: {
      //   'space': ['Space Grotesk', ...fontFamily.sans], // Ensure you have imported 'Space Grotesk' font
      // },
      // typography: {
      //   h1: ['1.875rem', { lineHeight: '2.25rem' }], // Tailwind uses 'rem' units
      //   h2: ['1.5rem', { lineHeight: '2rem' }],
      //   h3: ['1.25rem', { lineHeight: '1.75rem' }],
      //   h4: ['1rem', { lineHeight: '1.5rem' }],
      //   h5: ['0.875rem', { lineHeight: '1.25rem' }],
      //   p: ['1rem', { lineHeight: '1.5rem' }],
      // },

      // Customize your spacing scale here (margins, paddings, gaps)
      spacing: {
        '128': '32rem',
        '144': '36rem',
        // Add other custom spacing as needed
      },

      // Customize your container sizes here
      container: {
        center: true,
        padding: '2rem',
        // Add other custom container settings as needed
      },

      // Customize your breakpoints for responsive design here
      screens: {
        '2xl': '1536px', // Overwrite the 2xl breakpoint
        '3xl': '1920px', // Add a 3xl breakpoint
        // Add or overwrite other breakpoints as needed
      },

      // Customize additional styles such as borders, shadows, and more
      borderRadius: {
        'xl': '1rem',
        // Add other custom border radius values as needed
      },
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow
        // Add other custom shadows as needed
      },

      // Add custom animations and keyframes
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        // Define other animations as needed
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          // Define other keyframe steps as needed
        },
        // Define other keyframes as needed
      },
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here, for example:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};

