export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/AgendarCita.jsx",
    "./src/components/ResumenCita.jsx", 
  ],
  theme: {
    container: {
      center: false,
    },
    extend: {
      backgroundImage: {
        'fondo': "url('./src/assets/Fondo.jpg')",
        'logo': "url('./src/assets/Logo.png')"
      }
    },
  },
  plugins: [],
}


