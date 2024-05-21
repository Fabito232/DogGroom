import React, { useState } from 'react';
import './login.css'; // Archivo CSS para estilos


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para enviar las credenciales al backend
    console.log('Username:', username);
    console.log('Password:', password);
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
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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