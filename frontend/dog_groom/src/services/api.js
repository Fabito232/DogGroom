import axios from 'axios';
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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && config.url !== '/login') {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;