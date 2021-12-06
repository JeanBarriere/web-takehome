module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['HelveticaNeue', 'sans-serif'],
      },
      spacing: {
        5: '1.25rem'
      },
      colors: {
        gray: {
          bubble: '#C4C4C4',
          card: '#C2C2C2',
          subtext: '#848383',
        }
      },
      borderRadius: {
        card: '15px',
      },
      height: {
        screen: 'calc(var(--vh) * 100)',
      },
      minHeight: {
        screen: 'calc(var(--vh) * 100)',
      },
      maxWidth: {
        'fit-content': 'fit-content',
      }
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
