/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#1E40AF',
        primaryDark: '#1E3A8A',
        success: '#16A34A',
        ink: '#1F2937',
        inkMuted: '#4B5563',
        line: '#E5E7EB',
        surface: '#FFFFFF',
        wash: {
          DEFAULT: '#9FE870',
          deeper: '#8FD85F',
        },
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px',
      },
      boxShadow: {
        card: '0 6px 24px rgba(2, 6, 23, 0.08)',
        focus: '0 0 0 3px rgba(30, 64, 175, 0.25)',
      },
    },
  },
  plugins: [],
}
