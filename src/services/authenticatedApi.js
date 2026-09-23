import api from "./axios";

let getTokenFunction = null;

export const setGetToken = (getToken) => {
    getTokenFunction = getToken;
};

const authenticatedApi = {

    async get(url, config = {}) {

        const token =
            getTokenFunction
                ? await getTokenFunction()
                : null;

        return api.get(
            url,
            {
                ...config,
                headers: {
                    ...config.headers,
                    ...(token
                        ? {
                              Authorization:
                                  `Bearer ${token}`,
                          }
                        : {}),
                },
            }
        );

    },

    async post(url, data = {}, config = {}) {

        const token =
            getTokenFunction
                ? await getTokenFunction()
                : null;

        return api.post(
            url,
            data,
            {
                ...config,
                headers: {
                    ...config.headers,
                    ...(token
                        ? {
                              Authorization:
                                  `Bearer ${token}`,
                          }
                        : {}),
                },
            }
        );

    },

};

export default authenticatedApi;