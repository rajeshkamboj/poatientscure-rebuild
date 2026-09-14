/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B4332',
        secondary: '#8A9B6C',
        background: '#F7F5F0',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        'text-body': '#4A4A4A',
        'text-meta': '#6B6B6B',
        accent: '#CC7000',
        safety: '#D97706',
        success: '#059669',
        // dark mode colors
        'primary-dark': '#6B8E6A',
        'secondary-dark': '#A6B88A',
        'background-dark': '#1A1A1A',
        'surface-dark': '#2D2D2D',
        'text-dark': '#E0E0E0',
        'accent-dark': '#6B8E6A',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: '0.75rem', // 12px
        xl: '1rem',    // 16px
      },
      // We can also extend the spacing if needed, but the default is 4px base, which gives us 4,8,16,24,32,48,64 etc.
      // We'll leave it as default.
    },
  },
  plugins: [],
};