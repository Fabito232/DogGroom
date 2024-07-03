import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './authContext'; // Ajusta la ruta según tu estructura de proyecto
import Login from './login';
import Citas from './citas';
import AgendarCita from './AgendarCita';
import ListaProductos from './ListaProductos';
import AgregarProducto from './AgregarProducto';
import ListaClientes from './ListaClientes';
import AgregarCliente from './AgregarCliente';
import Finanzas from './Finanzas';
import ResumenCita from './resumenCita';
import { ConfirmProvider } from './ModalConfirmacion';
import ListaServicios from './ListaServicios';

//import { ConfirmProvider } from './ModalConfirmacion';


const App = () => {
  const { token } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const agregarProducto = (producto) => {
    console.log('Producto agregado:', producto);
  };

  const editarProducto = (producto) => {
    console.log('Producto editado:', producto);
  };

  return (
    <ConfirmProvider>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={!token ? <Login /> : <Navigate to="/citas" />} />
          <Route path="/citas" element={token ? <Citas /> : <Navigate to="/" />} />
          <Route path="/agendarCita" element={token ? <AgendarCita /> : <Navigate to="/" />} />
          <Route path="/productos" element={token ? <ListaProductos /> : <Navigate to="/" />} />
          <Route path="/resumen" element={token ? <ResumenCita /> : <Navigate to="/" />} />
          <Route path="/agregarProducto" element={
            token ? 
              <AgregarProducto 
                isOpen={isModalOpen}
                cerrar={closeModal}
                agregarProducto={agregarProducto}
                editarProducto={editarProducto}
                modo="agregar"
              /> 
            : 
              <Navigate to="/" />
          } />
          <Route path="/clientes" element={token ? <ListaClientes /> : <Navigate to="/" />} />
          <Route path="/agregarCliente" element={token ? <AgregarCliente /> : <Navigate to="/" />} />
          <Route path="/f" element={token ? <Finanzas /> : <Navigate to="/" />} />
          <Route path="/servicios" element={token ? <ListaServicios /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </ConfirmProvider>
  );
};

export default App;
