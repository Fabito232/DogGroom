import api from "./api";

export const crearServicio = async (Servicio) => {
    try {
        const response = await api.post('/servicios', Servicio);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const obtenerServicios = async () => {
    try {
        const response = await api.get('/servicios');
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const borrarServicio = async (id) => {
    try {
        const response = await api.delete(`/servicios/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const actualizarServicio = async (Servicio,id) => {
    try {
        const response = await api.put(`/servicios/${id}`, Servicio);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}
