import api from "./api";

export const resumenControlAnual = async (user) =>{
    try {
        const response = await api.get('/resumenControlAnual', user);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const resumenFinanzas = async (user) => {
    try {
        const response = await api.post('/resumenFinanzas', user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const crearGasto = async (gasto) => {
    try {
        const response = await api.post('/gasto', gasto);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const obtenerGastos = async () => {
    try {
        const response = await api.get('/gastos');
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const borrarGasto = async (id) => {
    try {
        const response = await api.delete(`/gasto/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const actualizarGasto = async (gasto,id) => {
    try {
        const response = await api.put(`/gasto/${id}`, gasto);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}
