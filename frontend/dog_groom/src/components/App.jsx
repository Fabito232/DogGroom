//import { useState } from 'react'
import AgendarCita from './AgendarCita';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login'
import Citas from './citas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListaProductos from './lista_productos';
import AgregarProducto from './agregar_producto';
import ListaClientes from './lista_clientes';


const App = () => {
  
  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/citas" element={<Citas />}/>
          <Route path="/agendarcita" element={<AgendarCita />}/>
          <Route path='/productos' element={<ListaProductos/>}/>
          <Route path='/agregarProducto' element={<AgregarProducto/>}/>
          <Route path='/clientes' element={<ListaClientes/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App
