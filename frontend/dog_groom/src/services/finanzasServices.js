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