module.exports = {
  plugins: [require('daisyui')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        white: 'var(--color-white)',
        gold: {
          100: '#FFF6E5',
          200: '#FFEBC5',
          300: '#FFD998',
          400: '#FFCB71',
          500: '#FFBF4D',
          600: '#FFB01F',
          700: '#FFA000',
          800: '#E09000',
          900: '#C27D00',
        },
      },
      fontFamily: {
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        40: '160px',
        48: '192px',
        64: '256px',
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
};
