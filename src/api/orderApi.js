import api from "./axios.js";

export const createOrder = async (order) => {
    const { data } = await api.post("/orders", order);
    return data.data;
};

export const getOrders = async () => {
    const { data } = await api.get("/orders");
    return data.data;
};