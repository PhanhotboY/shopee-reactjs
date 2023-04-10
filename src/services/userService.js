import axios from '../axios';

// axios.defaults.withCredentials = true;

const userService = {
    login(email, password) {
        return axios.post(`/api/users/login`, { email, password });
    },

    logout() {
        return axios.get('/api/auth/logout');
    },

    googleOAuth() {
        return axios.get(`/api/auth/google`);
    },

    signup(signupData) {
        return axios.post(`/api/users/signup`, signupData);
    },

    getAllUser() {
        return axios.get(`/api/users`);
    },

    async getCurrentUser() {
        return await axios.get('/api/users/current', {
            headers: {
                'Access-Control-Request-Headers': 'Content-Type',
                'Access-Control-Request-Method': 'GET',
            },
        });
    },

    getUser(id) {
        return axios.get(`/api/users/${id}`);
    },

    getDeletedUser() {
        return axios.get(`/api/users?deleted=true`);
    },

    updateUser(updateData) {
        if (updateData.uploadConfig) {
            try {
                const uploadConfig = updateData.uploadConfig;

                axios({
                    method: 'PUT',
                    url: uploadConfig.url,
                    data: uploadConfig.file,
                    headers: {
                        'Content-Type': uploadConfig.file.type,
                    },
                });

                updateData.avatar = uploadConfig.Key;
            } catch (err) {
                return {
                    errType: 'upload',
                    message: err.message,
                };
            }
        }

        return axios.put(`/api/users/${updateData.id}`, updateData);
    },

    deleteUser(id) {
        return axios.delete(`/api/users/${id}`);
    },

    permanentlyDeleteUser(id) {
        return axios.delete(`/api/users/${id}?permanently=true`);
    },

    restoreUser(id) {
        return axios.patch(`/api/users/${id}`, { action: 'restore' });
    },
};

export default userService;
