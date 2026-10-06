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

        console.log(
            "Axios getTokenFunction:",
            !!getTokenFunction
        );

        if (getTokenFunction) {

            const token =
                await getTokenFunction();

            console.log(
                "Axios token exists:",
                !!token
            );

            if (token) {

                config.headers =
                    config.headers || {};

                config.headers.Authorization =
                    `Bearer ${token}`;

            }

        }

        console.log(
            "Authorization exists:",
            !!config.headers?.Authorization
        );

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;