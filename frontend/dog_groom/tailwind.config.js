/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/AgendarCita.jsx",
    "./src/components/ListaProductos.jsx",
    "./src/components/AgregarProducto.jsx",
    "./src/components/ListaClientes.jsx",
    "./src/components/Finanzas.jsx",
    "./src/components/Header.jsx"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'fondo': "url('./src/assets/Fondo.jpg')",
        'logo': "url('./src/assets/Logo.png')",
        'perroFacturando': "url('./src/assets/perro-facturando-dinero.png')"
      },
      
    },
  },
  plugins: [],
}

