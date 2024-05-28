import api from "./api";

export const login = async (user) =>{
    try {
        const response = await api.post('/login', user);
        return response.data;
    } catch (error) {
        console.log(error.response)
        return error.response.data;
    }
}

export const createEmpleado = async (user) => {
    try {
        const response = await api.post('/empleados', user);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}