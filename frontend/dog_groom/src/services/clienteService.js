import api from "./api";

export const crearCliente = async (cliente) => {
    try {
        const response = await api.post('/clientes', cliente,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const obtenerClientes = async () => {
    try {
        const response = await api.get('/clientes');
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const borrarCliente = async (id) => {
    try {
        const response = await api.delete(`/clientes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const actualizarCliente = async (cliente, id) => {
    try {
        const response = await api.put(`/clientes/${id}`, cliente);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}
