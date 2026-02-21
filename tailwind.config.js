/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#DCEFFA',
        backgroundDeeper: '#C1E3F5',
        textDark: '#111827',
        surface: '#FFFFFF',
        accent: '#93C5FD'
      },
      fontFamily: {
        heading: ['Cabinet Grotesk', 'sans-serif'],
        drama: ['Instrument Serif', 'serif'],
        data: ['Space Mono', 'monospace'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
