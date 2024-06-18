import api from "./api";
import axios from 'axios';
export const crearCita = async (cita) => {
  try {
    const response = await api.post('/citas', cita);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const obtenerCitas = async () => {
  try {
    const response = await api.get('/citas'); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return { ok: false, message: "Error al obtener citas" };
  }
};

export const obtenerTodasCitas = async () => {
  try {
    const response = await api.get('/todasCitas'); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return { ok: false, message: "Error al obtener citas" };
  }
};

export const obtenerCita = async (id)=> {
  try {
    const response = await api.get(`/citas/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return { ok: false, message: "Error al obtener citas" };
  }
};

export const borrarCita = async (id) => {
  try {
    const response = await api.delete(`/citas/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const actualizarCita = async (cita, id) => {
  try {
    const response = await api.put(`/citas/${id}`, cita);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};
