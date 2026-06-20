/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3692FF',
          light: '#CFE5FF',
          50: '#E6F2FF',
        },
        error: '#F74747',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        logo: ['RokafSans', 'Pretendard', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        modal: '0 1.5rem 3rem rgba(17, 24, 39, 0.2)',
      },
    },
  },
  plugins: [],
};
