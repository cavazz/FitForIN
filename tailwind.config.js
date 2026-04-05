/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg':       '#161412',
        'nav':      '#111009',
        's1':       '#1A1714',
        's2':       '#161412',
        'card':     '#1E1A14',
        'elevated': '#252018',
        'gold':     '#C9A052',
        'gold-l':   '#E8DCBA',
        'gold-d':   '#7A5E28',
        'dim':      '#8B7040',
        'muted':    '#4A3828',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'display':  '-0.04em',
        'wide4':    '0.25em',
      },
    },
  },
  plugins: [],
}
