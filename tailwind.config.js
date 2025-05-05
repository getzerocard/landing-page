module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#40FF00',
          50: '#F2FFEB',
          100: '#E5FFD6',
          200: '#CCFFAD',
          300: '#B3FF85',
          400: '#9AFF5C',
          500: '#40FF00',
          600: '#33CC00',
          700: '#269900',
          800: '#1A6600',
          900: '#0D3300',
        },
        secondary: {
          DEFAULT: '#1F1F1F',
          light: '#2A2A2A',
          dark: '#181818',
        },
        tertiary: {
          DEFAULT: '#919191',
          light: '#A8A8A8',
          dark: '#767676',
        },
        background: '#F7F7F7',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
    },
  },
  plugins: [],
};
