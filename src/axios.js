import axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    // withCredentials: true
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;

        return response.data;
    },
    (error) => {
        const { response } = error;

        return Promise.reject(new Error(response));
    }
);

export default instance;
