import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/empleadoService'; // Asegúrate de importar tu función de login
import { notificarError, notificarExito } from '../../utilis/notificaciones';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ correo: username, contrasena: password });

      if (response.ok) {
        onLogin(response.token); 
        notificarExito('Inicio de sesión exitoso!');
        navigate('/citas');
      } else {
        notificarError("Error en inicio de sesión:\n" + response.message);
      }
    } catch (error) {
      notificarError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-primary bg-opacity-80 bg-fondo bg-cover">
      <div className="relative z-10 bg-amber-800 bg-opacity-90 rounded-3xl p-8 shadow-lg w-auto md:w-96">
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 bg-cover rounded-full bg-logo"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Correo electrónico"
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
