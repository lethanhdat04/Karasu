/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',     // Xanh dương chính
        'primary-dark': '#357ABD', // Xanh dương đậm
        'primary-light': '#5FA3F5', // Xanh dương nhạt
        secondary: '#6C5CE7',   // Tím
        accent: '#FFB703',      // Vàng (PRO badge)
        danger: '#E74C3C',      // Đỏ
        success: '#2ECC71',     // Xanh lá
        dark: {
          bg: '#1a1d29',        // Background chính
          card: '#252836',      // Card background
          border: '#2d3142',    // Border
          text: '#e8eaed',      // Text chính
          'text-secondary': '#9ca3af', // Text phụ
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
    },
  },
  plugins: [],
}
