/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#050505',
          darker: '#000000',
          light: '#F4F4F5',
        },
        accent: {
          DEFAULT: '#C6F135', // Vibrant lime/chartreuse
          hover: '#b1d92f',
        },
        surface: {
          DEFAULT: '#111111',
          border: '#222222',
        },
        text: {
          primary: '#F4F4F5',
          secondary: '#A1A1AA',
          muted: '#52525B',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'], // Or we can import a brutalist font if needed
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 10vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'huge': ['clamp(2rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
