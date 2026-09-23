import api from "./axios";

export const getServices = async () => {

    const { data } = await api.get("/services");

    return data;

};