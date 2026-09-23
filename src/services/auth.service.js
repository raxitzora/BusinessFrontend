import api from "./axios";

export const syncUser = async (token) => {
    const { data } = await api.post(
        "/auth/sync",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};