/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'white': {
          'shade-1':'#ffffff',
          'shade-2':'#f7f7f7'
        },
        'sky': {
          'shade-1':'#39A0ED'
        },
        'gray': {
          'shade-1':'#919191'
        }
      }
    },
  },
  plugins: [],
}

