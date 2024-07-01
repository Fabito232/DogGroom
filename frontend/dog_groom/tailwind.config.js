export default {
  content: [
    "./src/components/login.jsx",
    "./src/components/inventario/ListaProductos.jsx",
    "./src/components/inventario/AgregarProducto.jsx",
    "./src/components/cliente/ListaClientes.jsx",
    "./src/components/cliente/AgregarCliente.jsx",
    "./src/components/finanzas/Finanzas.jsx",
    "./src/components/Header.jsx",
    "./src/components/finanzas/AgregarGasto.jsx",
    "./src/components/finanzas/ListaGastos.jsx",
    "./src/components/cita/ListaServicios.jsx",
    "./src/components/cita/AgregarServicio.jsx",
    "./src/components/cita/AgendarCita.jsx",
    "./src/components/cita/ResumenCita.jsx",
    "./src/components/cliente/MostrarMascotas.jsx",
    "./src/components/cliente/AgregarMascota.jsx",
    "./src/components/cita/ListaCitas.jsx",
    "./src/components/formulario/FloatingLabelInput.jsx",
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

