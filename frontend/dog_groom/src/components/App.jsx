import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  
  return (
    <>
    <ConfirmProvider>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/citas" element={<Citas />}/>
          <Route path="/agendarCita" element={<AgendarCita />}/>
          <Route path='/productos' element={<ListaProductos/>}/>
          <Route path='/resumen'element={<ResumenCita/>}/>
          <Route path='/agregarProducto' element={<AgregarProducto/>}/>
          <Route path='/clientes' element={<ListaClientes/>}/>
          <Route path='/agregarCliente' element={<AgregarCliente/>}/>
          <Route path='/f' element={<Finanzas/>}/>
          <Route path='/servicios' element={<ListaServicios/>}/>
        </Routes>
      </Router>
    </ConfirmProvider>
    </>
  )
}
export default App
