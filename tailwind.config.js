/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Institutional high-clarity palette
        primary: {
          DEFAULT: '#041627',
          container: '#1a2b3c',
          light: '#24374b',
          dark: '#020b14',
        },
        secondary: {
          DEFAULT: '#735c00',
          container: '#fed65b',
          fixed: '#ffe088',
          'fixed-dim': '#e9c349',
        },
        tertiary: {
          DEFAULT: '#00531b',
          container: '#00320d',
          fixed: '#99f89e',
          'fixed-dim': '#7edb85',
        },
        ink: {
          DEFAULT: '#161c22',
          muted: '#44474c',
          faint: '#74777d',
        },
        navy: {
          DEFAULT: '#041627',
          light: '#1a2b3c',
          dark: '#020b14',
          muted: '#2b3d66',
        },
        paper: {
          DEFAULT: '#ffffff',
          dim: '#eff4fd',
          light: '#f7f9ff',
          card: '#ffffff',
        },
        page: '#f7f9ff',
        brass: {
          DEFAULT: '#735c00',
          light: '#e9c349',
          dark: '#574500',
          faint: '#fff6dd',
        },
        oxblood: {
          DEFAULT: '#ba1a1a',
          light: '#de3730',
          dark: '#93000a',
          faint: '#ffdad6',
        },
        forest: {
          DEFAULT: '#00531b',
          light: '#48a354',
          dark: '#00320d',
          faint: '#e8f7ea',
        },
        border: {
          DEFAULT: '#c4c6cd',
          dark: '#74777d',
          light: '#dde3ec',
          subtle: '#EDE9E3',
        },
      },
      fontFamily: {
        display: ['Lora', '"Source Serif 4"', '"Noto Sans Devanagari"', 'Georgia', 'serif'],
        body: ['Inter', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        hindi: ['"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(20, 30, 51, 0.05), 0 1px 2px rgba(20, 30, 51, 0.03)',
        cardHover: '0 6px 18px rgba(20, 30, 51, 0.08), 0 2px 4px rgba(20, 30, 51, 0.04)',
        elevation: '0 12px 32px rgba(20, 30, 51, 0.12)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
