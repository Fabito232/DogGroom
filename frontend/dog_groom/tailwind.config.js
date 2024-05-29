/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/AgendarCita.jsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondo': "url('./src/assets/Fondo.jpg')",
        'logo': "url('./src/assets/Logo.png')"
      }
    },
  },
  plugins: [],
}

