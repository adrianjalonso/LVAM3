/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html}',
  ],
  theme: {
    extend: {
      transitionDelay: { 
          '50': '50ms',
          '100': '100ms',
          '150': '150ms',
        },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0'},
          '100%': { backgroundPosition: '1000px 0'}
        },
        fadeIn: {
          "0%": {opacity: 0, transform: "scale(0.95)"},
          "100%": {opacity: 1, transform: "scale(1)"}
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
        "fade-in": "fadeIn 0.2 ease-out"
      },
      fontFamily: {
        sans: [
    "Plus Jakarta Sans", "sans-serif"
  ]
      },
      colors: {
        "primary": "#cb6452",
        "escuro": "#333333",
        "light": "#F5F5F5"
      }
    },
  },
  plugins: [],
}

