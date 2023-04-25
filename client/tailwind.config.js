/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        1100: '1100px'
      },
      backgroundColor: {
        primary: '#f5f5f5',
        secondary1: '#1653dd',
        secondary2: '#f73859',
        secondary3: '#e8f0fe'
      },
      maxWidth: {
        600: '600px',
        1100: '1100px'
      }
    }
  },
  plugins: []
}
