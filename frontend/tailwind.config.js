module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': '350px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
        'dark-green':'#062315',
        'cyphrus':'#06373A',
        'eden':'#1F5F5B',
        'salem':'#159947',
        'ocean-green':'#49B265',
        'tl-grey':'#1f2937',
        'tl-light-grey':'#374151'
      }
    },
  },
  plugins: [],
}