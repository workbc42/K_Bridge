import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getMenuItems = async () => {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data;
};

export const createMenuItem = async (data) => {
    const response = await axios.post(`${API_URL}/menu`, data);
    return response.data;
};

export const updateMenuItem = async (id, data) => {
    const response = await axios.put(`${API_URL}/menu/${id}`, data);
    return response.data;
};

export const deleteMenuItem = async (id) => {
    const response = await axios.delete(`${API_URL}/menu/${id}`);
    return response.data;
};

export const resetMenu = async () => {
    const response = await axios.post(`${API_URL}/menu/reset`);
    return response.data;
};
