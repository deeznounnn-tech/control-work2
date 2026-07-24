import api from "./axios.js";

export const loginUser = async (userData) => {
    const { data } = await api.post("/auth/sign-in", userData);
    return data;
};

export const getProfile = async () => {
    const { data } = await api.get("/auth/profile");
    return data;
};

export const addToFavorites = async (productId) => {
    const { data } = await api.post("/favorites", {
        productId,
    });

    return data;
};

export const removeFromFavorites = async (productId) => {
    const { data } = await api.delete(`/favorites/${productId}`);
    return data;
};

export const getFavorites = async () => {
    const { data } = await api.get("/favorites");

    return data.data.products;
};