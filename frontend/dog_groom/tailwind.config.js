export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/ListaProductos.jsx",
    "./src/components/AgregarProducto.jsx",
    "./src/components/ListaClientes.jsx",
    "./src/components/AgregarCliente.jsx",
    "./src/components/Finanzas.jsx",
    "./src/components/Header.jsx",
    "./src/components/AgregarGasto.jsx",
    "./src/components/ListaGastos.jsx",
    "./src/components/ModalConfirmacion.jsx",
    "./src/components/ListaServicios.jsx",
    "./src/components/AgregarServicio.jsx",
    "./src/components/AgendarCita.jsx",
    "./src/components/resumen.jsx",
    "./src/components/ModalMascotas.jsx",
    "./src/components/AgregarMascota.jsx",
  
  ],
  theme: {
    container: {
      center: false,
    },
    extend: {
      backgroundImage: {
        'fondo': "url('./src/assets/Fondo.jpg')",
        'fondo1': "url('./src/assets/Fondo1.jpg')",
        'fondo2': "url('./src/assets/Fondo2.png')",
        'logo': "url('./src/assets/Logo.png')",
        'perroFacturando': "url('./src/assets/perro-facturando-dinero.png')",
        'agregarCliente' : "url('./src/assets/fondoAgregarCliente.jpeg')"
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

