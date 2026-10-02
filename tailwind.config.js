/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Professional legal publication palette
        page: {
          DEFAULT: '#FAF8F5', // warm off-white
          warm: '#F6F3EC',
          dim: '#F2EDE3',
        },
        ink: {
          DEFAULT: '#0C131F', // deep black / dark navy
          dark: '#080D15',
          navy: '#0F1A2C',
          muted: '#414958',
          faint: '#667085',
        },
        maroon: {
          DEFAULT: '#6E1B24', // deep red
          dark: '#4E1118',
          light: '#8D2430',
          faint: '#FAF0F2',
        },
        navy: {
          DEFAULT: '#133054', // rich blue
          light: '#1C4376',
          dark: '#0C1F38',
          muted: '#2A5288',
        },
        brass: {
          DEFAULT: '#967428', // muted gold accent
          light: '#C8A34E',
          dark: '#6E5218',
          faint: '#FBF7EE',
        },
        primary: {
          DEFAULT: '#133054',
          container: '#1C4376',
          light: '#255594',
          dark: '#0C1F38',
        },
        secondary: {
          DEFAULT: '#967428',
          container: '#fed65b',
          fixed: '#ffe088',
          'fixed-dim': '#e9c349',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          dim: '#F4F2EC',
          light: '#FDFCF9',
          card: '#FFFFFF',
        },
        red: {
          DEFAULT: '#B91C1C',
          dark: '#881337',
          light: '#DC2626',
          faint: '#FEF2F2',
        },
        oxblood: {
          DEFAULT: '#6E1B24',
          light: '#8D2430',
          dark: '#4E1118',
          faint: '#FAF0F2',
        },
        forest: {
          DEFAULT: '#14532D',
          light: '#16A34A',
          dark: '#052E16',
          faint: '#F0FDF4',
        },
        border: {
          DEFAULT: '#DCD8D0',
          dark: '#787D87',
          light: '#EDEAE4',
          subtle: '#F2EFEB',
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
        '2xs': '0 1px 2px rgba(17, 24, 39, 0.04)',
        xs: '0 1px 3px rgba(17, 24, 39, 0.05), 0 1px 2px rgba(17, 24, 39, 0.03)',
        card: '0 1px 3px rgba(20, 30, 51, 0.05), 0 1px 2px rgba(20, 30, 51, 0.03)',
        cardHover: '0 4px 12px rgba(20, 30, 51, 0.06), 0 1px 3px rgba(20, 30, 51, 0.03)',
        elevation: '0 12px 32px rgba(20, 30, 51, 0.12)',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
