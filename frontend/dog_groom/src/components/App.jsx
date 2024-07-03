import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/usuario/Login';
import Citas from '../components/cita/Citas';
import AgendarCita from '../components/cita/AgendarCita';
import ListaProductos from '../components/inventario/ListaProductos';
import AgregarProducto from '../components/inventario/AgregarProducto';
import ListaClientes from '../components/cliente/ListaClientes';
import AgregarCliente from '../components/cliente/AgregarCliente';
import Finanzas from '../components/finanzas/Finanzas';
import ResumenCita from '../components/cita/ResumenCita';
import ListaServicios from '../components/cita/ListaServicios';
import ListaCitas from '../components/cita/ListaCitas';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const renderProtectedRoute = (Component) => {
    return token ? <Component /> : <Navigate to="/" />;
  };

  const NotFound = () => (
    <div className="h-screen flex items-center justify-center bg-red-300 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-lg">Lo sentimos, la página que buscas no existe.</p>
      </div>
    </div>
  );


  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/calendario"
            element={renderProtectedRoute(() => <Citas />)}
          />
          <Route
            path="/agendarCita"
            element={renderProtectedRoute(() => <AgendarCita />)}
          />
          <Route
            path="/productos"
            element={renderProtectedRoute(() => <ListaProductos />)}
          />
          <Route
            path="/resumen"
            element={renderProtectedRoute(() => <ResumenCita />)}
          />
          <Route
            path="/agregarProducto"
            element={renderProtectedRoute(() => (
              <AgregarProducto /> ))}
          />
          <Route
            path="/clientes"
            element={renderProtectedRoute(() => <ListaClientes />)}
          />
          <Route
            path="/agregarCliente"
            element={renderProtectedRoute(() => <AgregarCliente />)}
          />
          <Route
            path="/finanzas"
            element={renderProtectedRoute(() => <Finanzas />)}
          />
          <Route
            path="/servicios"
            element={renderProtectedRoute(() => <ListaServicios />)}
          />
          <Route
            path="/citas"
            element={renderProtectedRoute(() => <ListaCitas />)}
          />
          <Route
          path='*'
          element={<NotFound/>}
        />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
