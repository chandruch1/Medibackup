import api from "../api/api";

export const login = async (loginData) => {
    const response = await api.post("/auth/login", loginData);
    return response.data;
};