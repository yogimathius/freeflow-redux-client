module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
        3: '3px'
      },
      fontFamily: {
        body: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        xxs: ['0.5rem']
      },
      height: {
        '1/2': '50vh',
        '3/5': '60vh',
        '3/4': '75vh',
        '9/10': '90vh'
      }
    }
  },
  variants: {
    extend: {
      borderWidth: ['active', 'focus', 'hover', 'group-hover'],
      borderColor: ['active'],
      position: ['last']
      // scrollSnapType: ['responsive']
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwindcss-scroll-snap')
  ]
}
