/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07080b',
          900: '#0c0e13',
          800: '#12151c',
          700: '#1a1e27',
          600: '#252a35',
        },
        fg: {
          DEFAULT: '#eef1f6',
          muted: '#a3abba',
          subtle: '#6f7787',
        },
        brand: {
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        content: '80rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -12px rgb(0 0 0 / 0.6)',
        glow: '0 0 0 1px rgb(249 115 22 / 0.35), 0 12px 40px -8px rgb(249 115 22 / 0.35)',
      },
    },
  },
  plugins: [],
};
