import api from "./axios";

const authenticatedApi = {

    async get(url, config = {}) {

        return api.get(
            url,
            {
                ...config,
            }
        );

    },

    async post(url, data = {}, config = {}) {

        return api.post(
            url,
            data,
            {
                ...config,
            }
        );

    },

};

export default authenticatedApi;