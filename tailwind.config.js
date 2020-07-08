module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        inverse: 'var(--color-inverse)',
        'inverse-dark': 'var(--color-inverse-dark)',
        'secondary-light': 'var(--color-secondary-light)',
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
      },
    },
  },
  variants: {},
  plugins: [],
};
