/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bubblePink: "#ffd1dc",
        bubbleBlue: "#d1e8ff",
        bubblePurple: "#e6d1ff",
        bubbleYellow: "#fff8d1",
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'wobble': 'wobble 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        wobble: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-15px)' },
          '75%': { transform: 'translateX(15px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 255, 255, 0.5)',
        'inner-glow': 'inset 0 0 15px rgba(255, 255, 255, 0.5)',
      },
      fontFamily: {
        heading: ['"Bubblegum Sans"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'animate-fadeIn',
    'animate-float',
    'animate-pulse',
    'animate-shimmer',
    'animate-wobble',
    'bg-pink-300', 'bg-pink-400', 'bg-pink-500',
    'bg-blue-300', 'bg-blue-400', 'bg-blue-500',
    'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500',
    'bg-purple-300', 'bg-purple-400', 'bg-purple-500',
  ],
}; 