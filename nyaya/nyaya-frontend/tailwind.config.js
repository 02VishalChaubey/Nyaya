/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Institutional / gazette palette — deliberately not the
        // warm-cream + terracotta template. Deep navy + paper + brass + oxblood.
        ink: '#1A1D29',
        navy: {
          DEFAULT: '#16213E',
          light: '#22335C',
          dark: '#0E1526',
        },
        paper: {
          DEFAULT: '#F5F1E6',
          dim: '#EDE8D9',
        },
        page: '#EEEAE0',
        brass: {
          DEFAULT: '#A8823C',
          light: '#C4A05F',
          dark: '#8A6A2E',
        },
        oxblood: {
          DEFAULT: '#6B2E2E',
          light: '#8A3F3F',
        },
        border: {
          DEFAULT: '#D9D3C0',
          dark: '#33395A',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(22, 33, 62, 0.06), 0 1px 1px rgba(22, 33, 62, 0.04)',
        cardHover: '0 4px 14px rgba(22, 33, 62, 0.1)',
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
}
