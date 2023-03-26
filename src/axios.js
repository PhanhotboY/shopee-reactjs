import axios from 'axios';

import keys from 'config/keys.config';

const instance = axios.create({
    baseURL: keys.backendURL,
    // withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;

        return data;
    },
    (error) => {
        const { message } = error;

        return Promise.reject(new Error(message));
    }
);

export default instance;
