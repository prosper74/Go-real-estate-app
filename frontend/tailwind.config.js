/** @type {import('tailwindcss').Config} */
module.exports = {
  enabled: process.env.NODE_ENV === 'production',
  options: {
    safelist: [],
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '340px',
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: '#67009b',
        primaryLight: '#e7b8ff',
        // 'gray-700': '#273444',
        // gray: '#8492a6',
        // 'gray-50': '#f8fafc',
      },
      width: {
        130: '62rem',
        128: '47rem',
        30: '30rem',
        19: '19rem',
      },
      height: {
        127: '20rem',
        128: '30rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  // darkMode: `class`,
}
