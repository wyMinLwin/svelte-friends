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
          'shade-1':'#39A0ED',
          'shade-2':'#2B76D2'
        },
        'gray': {
          'shade-1':'#919191'
        },
        "red": {
          "shade-1":"#FDDCE0",
          "shade-2":"#ED5565",
          "shade-3":"#DA4453"
        },
        "green": {
          "shade-1":"#def7ec",
          "shade-2":"#217c5f"
        }
      }
    },
  },
  plugins: [],
}

