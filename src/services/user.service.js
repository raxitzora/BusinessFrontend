import api from "./axios";

export const getProfile = async () => {
    const { data } = await api.get("/user/profile");
    return data;
};

export const getUserServices = async () => {
    const { data } = await api.get("/user/services");
    return data;
};

export const saveUserServices = async (payload) => {
    const { data } = await api.post("/user/services", payload);
    return data;
};