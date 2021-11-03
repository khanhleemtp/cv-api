const plugin = require('tailwindcss/plugin');
module.exports = {
  // purge: [],
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      ringColor: ['hover', 'active'],
      ringOffsetColor: ['hover', 'active'],
      borderWidth: ['last'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/typography'),
    // require('tailwindcss-children'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ' .no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
