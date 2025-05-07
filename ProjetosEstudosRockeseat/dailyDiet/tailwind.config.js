const { green } = require('react-native-reanimated/lib/typescript/Colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NunitoSans_400Regular', 'NunitoSans_700Bold'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px',
      },
      lineHeight: {
        normal: '130%',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors: {
        white: '#FFFFFF',
        gray: {
          1: '#1b1d1e',
          2: '#333638',
          3: '#5c6265',
          4: '#b9bbbc',
          5: '#dddedf',
          6: '#eff0f0',
          7: '#fafafa',
        },
        red: {
          dark: '#bf3b44',
          mid: '#f3badb',
          light: '#f4e6e7',
        },
        green: {
          dark: '#639339',
          mid: '#cbe4b4',
          light: '#e5f0db',
        },
      }
    },
  },
  plugins: [],
}