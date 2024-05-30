import api from "./api";

export const crearProducto = async (producto) => {
    try {
        const response = await api.post('/productos', producto);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const obtenerProductos = async () => {
    try {
        const response = await api.get('/productos');
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const borrarProducto = async (id) => {
    try {
        const response = await api.delete(`/productos/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const actualizarProducto = async (producto,id) => {
    try {
        const response = await api.put(`/productos/${id}`, producto);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}
