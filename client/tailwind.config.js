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
        secondary3: '#e8f0fe',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)'
      },
      maxWidth: {
        600: '600px',
        1100: '1100px'
      }
    }
  },
  plugins: []
}
