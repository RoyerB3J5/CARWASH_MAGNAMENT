/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        p : '1rem',
        h5: '1.333rem',
        'h4': '1.777rem',
        'h3': '2.369rem',
        'h2': '3.158rem',
        'h1': '4.210rem',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors:{
        'primary': '#0347f2',
        'accent': '#FFD700',
        'back': 'rgb(200,200,200)'
      },
      boxShadow:{
        'shadow':'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      }
    },
  },
  plugins: [],
}

