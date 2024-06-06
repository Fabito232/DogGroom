import api from "./api";

export const crearMascota = async (mascota) => {
    try {
        const response = await api.post('/mascotas', mascota, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const obtenerMascotas = async () => {
    try {
        const response = await api.get('/mascotas');
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const borrarMascota = async (id) => {
    try {
        const response = await api.delete(`/mascotas/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const actualizarMascota = async (mascota,id,) => {
    try {
        const response = await api.put(`/mascotas/${id}`, mascota, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}