import api from "./axios.js";

export const loginUser = async (userData) => {
    const { data } = await api.post("/auth/sign-in", userData);
    return data;
};

export const getProfile = async () => {
    const { data } = await api.get("/auth/profile");
    return data;
};