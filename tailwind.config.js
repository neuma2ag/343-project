/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.html', 'src/**/*.js'],
  theme: {
    extend: {
        colors: {
            'dracula-background': '#282A36',
            'dracula-current': '#44475A',
            'dracula-purple': '#BD93F9',
            'dracula-foreground': '#F8F8F2',
        }
    },
  },
  plugins: [],
}

