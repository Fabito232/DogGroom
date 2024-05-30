/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/AgendarCita.jsx",
    "./src/components/AgregarCliente.jsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondo': "url('./src/assets/Fondo.jpg')",
        'logo': "url('./src/assets/Logo.png')",
        'citas': "url('./src/assets/Citas.jpg')"
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        customGreen: '#81B850'
      }
    },
  },
  plugins: [],
}