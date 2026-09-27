/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#06080D', 2: '#0B0F17', 3: '#111726' },
        ivory: { DEFAULT: '#ECE7DD', 2: '#E2DCCF', dim: '#B9B3A7' },
        glass: { DEFAULT: '#9DB8FF', deep: '#3D6FE0' },
        mute: '#8A92A3',
        line: 'rgba(236,231,221,0.12)',
        lineInk: 'rgba(6,8,13,0.14)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.055em' },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        quart: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      maxWidth: { frame: '1440px' },
    },
  },
  plugins: [],
};
