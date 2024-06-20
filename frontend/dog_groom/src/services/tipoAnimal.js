import api from "./api";

export const crearTipoMascota = async (TipoMascota) => {
    try {
        const response = await api.post('/tipoMascotas', TipoMascota);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const obtenerTipoMascotas = async () => {
    try {
        const response = await api.get('/tipoMascotas');
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const borrarTipoMascota = async (id) => {
    try {
        const response = await api.delete(`/tipoMascotas/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const actualizarTipoMascota = async (TipoMascota,id) => {
    try {
        const response = await api.put(`/tipoMascotas/${id}`, TipoMascota);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}
