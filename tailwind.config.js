/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inria_Sans', 'sans'],
      serif: ['Inria_Serif', 'serif'],
      inika: 'Inika'
    },
    colors: {
      white: '#FFFFFF',
      'primary': '#C7253E',
      'secondary': '#821131',
      'grey-light': '#656565',
      'grey-heavy': '#4B4B4B',
    }
  },
  plugins: [],
}