/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '320px', // Mobile
      md: '481px', // Small tablets and larger mobile
      lg: '769px', // Tablets and small laptops
      xl: '1025px', // Large desktops
      '2xl': '1440px', // Extra-large screens
    },
    extend: {
      colors: {
        // Primary colors
        primary: '#121F2F', // Legacy primary
        secondary: '#00a79d', // Updated to match logo green color
        dark: '#0D1B2A',
        light: '#F9F9F9',

        // New color definitions as per requirements
        'hero-bg': 'rgb(6 4 31)', // Hero section background
        'stats-bg': 'rgb(32 60 91)', // Vonoy in numbers section
        'footer-bg': 'rgb(12 29 44)', // Footer background
        highlight: '#0a6dc2', // Highlight color
      },
      // Animation definitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
        'slide-down': 'slideDown 0.6s ease-in-out',
        'slide-in-right': 'slideInRight 0.6s ease-in-out',
        'slide-in-left': 'slideInLeft 0.6s ease-in-out',
        'bounce-light': 'bounceLight 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s infinite',
        fadeInUp: 'fadeInUp 0.7s ease-out forwards',
        drawLine: 'drawLine 1.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000', opacity: '0' },
          '100%': { strokeDashoffset: '0', opacity: '0.2', animationPlayState: 'paused' },
        },
      },
    },
  },
  plugins: [],
};
