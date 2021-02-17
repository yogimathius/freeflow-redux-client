module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
       '1': '1px',
       '3': '3px' 
      },
      fontFamily: {
        'body': ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'xxs': ['0.5rem']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
