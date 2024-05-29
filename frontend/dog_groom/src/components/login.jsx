import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/empleadoService';
import { toast } from 'react-toastify';
import logo from '../assets/Logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ correo: username, contrasena: password });
      
      if (response.ok) {
        localStorage.setItem('token', response.token);
        toast.success('Inicio de sesión exitoso!', { autoClose: 1500, theme: "colored"});
        navigate('/citas');
      } else {
        showErrorToast(response.message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const showErrorToast = (message) => {
    toast.error('Error en inicio de sesión:\n' + message, {
      autoClose: 2000,
      style: {
        whiteSpace: 'pre-line',
      },
      theme: "colored"
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-primary bg-opacity-80 bg-fondo bg-cover"> 
      <div className="relative z-10 bg-amber-800 bg-opacity-90 rounded-3xl p-8 shadow-lg w-auto md:w-96">
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 bg-cover rounded-full" style={{ backgroundImage: `url(${logo})` }}></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700 focus:outline-none focus:bg-green-700">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
