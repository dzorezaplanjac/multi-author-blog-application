/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef7ff',
          100: '#fdf2ff',
          200: '#fce7ff',
          300: '#f8d4fe',
          400: '#f2b8fc',
          500: '#e879f9',
          600: '#d946ef',
          700: '#c026d3',
          800: '#a21caf',
          900: '#86198f',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
          }
        }
      }
    },
  },
  plugins: [],
};