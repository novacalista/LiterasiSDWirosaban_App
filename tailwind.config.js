/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#003B95',
          dark: '#002E73',
          light: '#E8F1FF',
        },
        secondary: {
          DEFAULT: '#00A884',
          dark: '#008B6D',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#FACC15',
          light: '#FEF9C3',
        },
        danger: {
          DEFAULT: '#DC2626',
        },
        background: '#F7F8FC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '999px',
      },
      boxShadow: {
        soft: '0 4px 12px rgba(15, 23, 42, 0.08)',
        nav: '0 -4px 16px rgba(15, 23, 42, 0.10)',
        floating: '0 8px 20px rgba(0, 59, 149, 0.25)',
      },
    },
  },
  plugins: [],
}
