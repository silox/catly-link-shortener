module.exports = {
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      primary: ['QuickSand', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#F8F272',
        secondary: '#242325',
        boxcolor: '#FFFFFF',
      },
    },
    transitionProperty: {
      height: 'height',
    },
  },
  plugins: [],
};
