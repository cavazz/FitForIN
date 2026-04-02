/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg':       '#080808',
        'nav':      '#000000',
        's1':       '#111111',
        's2':       '#0c0c0c',
        'card':     '#161616',
        'elevated': '#1c1c1c',
        'dim':      '#888888',
        'muted':    '#3a3a3a',
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
