//import { useState } from 'react'
import AgendarCita from './AgendarCita';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login'
import Citas from './citas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListaProductos from './lista_productos';
import ListaClientes from './lista_clientes';
import '../styles/lista_productos.css';
import Finanzas from './Finanzas';
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
          <Route path='/clientes' element={<ListaClientes/>}/>
          <Route path='/f' element={<Finanzas/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App
