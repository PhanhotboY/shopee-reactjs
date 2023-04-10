import axios from 'axios';

import keys from 'config/keys.config';

const instance = axios.create({
    baseURL: keys.backendURL,
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;

        return data;
    },
    (error) => {
        const { response } = error;

        return Promise.reject(
            new Error(response.data.message || `${response.status}: ${response.statusText}`)
        );
    }
);

export default instance;
