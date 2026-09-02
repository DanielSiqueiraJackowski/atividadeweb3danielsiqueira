import api from './api';

export const getUsuarios = async (search = '') => {
    const response = await api.get("/usuarios", {
        params: { search }
    });
    return response.data;
}