import { useState } from 'react';
import '../styles/login.css'; // Archivo CSS para estilos
import { useNavigate } from 'react-router-dom'
import { login } from '../services/empleadoService';
import { toast } from 'react-toastify';

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
    <div className="img-backend ">
      <div className="login-container">
       
        <div className="login-box">
        <div className="overlay-image"></div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <button type="submit">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;