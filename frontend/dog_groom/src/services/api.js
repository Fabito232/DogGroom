import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = "http://localhost:4000/api";
//export const URL_Hosting = "https://doggroom.onrender.com";
export const URL_Hosting = "http://localhost:4000";
//const API_URL = "https://doggroom.onrender.com/api";


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const isTokenExpiringSoon = (token, thresholdInSeconds = 86400) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); 
    const expirationTime = decoded.exp; 

    return (expirationTime - currentTime) < thresholdInSeconds;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true; 
  }
};

const renovarToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/renovar-token/`, { token });
    console.log('sesion')
    return response.data.nuevoToken;
  } catch (error) {
    console.error('Error al renovar el token:', error);
    return null;
  }
};

// Configurar el interceptor de solicitud de Axios
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('token');

    if (token && config.url !== '/') {
      if (isTokenExpiringSoon(token)) {
        const nuevoToken = await renovarToken(token);
        if (nuevoToken) {
          localStorage.setItem('token', nuevoToken);
          token = nuevoToken;
        } else {
          localStorage.removeItem('token'); 
          window.location.href = '/';
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configurar el interceptor de respuesta de Axios
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;
