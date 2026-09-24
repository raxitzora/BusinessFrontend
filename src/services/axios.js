import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 120000,
});

let getTokenFunction = null;

export const setTokenGetter = (getToken) => {
    getTokenFunction = getToken;
};

api.interceptors.request.use(
    async (config) => {
        if (getTokenFunction) {
            const token = await getTokenFunction();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;