import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Citas from './cita/Citas';
import AgendarCita from './cita/AgendarCita';
import ListaProductos from './inventario/ListaProductos';
import ListaClientes from './cliente/ListaClientes';
import AgregarCliente from './cliente/AgregarCliente';
import Finanzas from './finanzas/Finanzas';
import ResumenCita from './cita/ResumenCita';
import ListaServicios from './cita/ListaServicios';
import ListaCitas from './cita/ListaCitas';
const App = () => {

  return (
    <>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/calendario" element={<Citas />}/>
          <Route path="/agendarCita" element={<AgendarCita />}/>
          <Route path='/productos' element={<ListaProductos/>}/>
          <Route path='/resumen'element={<ResumenCita/>}/>
          <Route path='/clientes' element={<ListaClientes/>}/>
          <Route path='/agregarCliente' element={<AgregarCliente/>}/>
          <Route path='/finanzas' element={<Finanzas/>}/>
          <Route path='/servicios' element={<ListaServicios/>}/>
          <Route path='/citas' element={<ListaCitas/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App
