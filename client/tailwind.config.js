/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'black',
        secondary: '#1E90FF',
      },
    },
  },
   plugins: [
        require('flowbite/plugin')
  ]
}
