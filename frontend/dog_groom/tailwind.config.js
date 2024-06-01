/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/AgendarCita.jsx",
    "./src/components/lista_productos.jsx",
    "./src/components/agregar_producto.jsx",
    "./src/components/lista_clientes.jsx",
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

