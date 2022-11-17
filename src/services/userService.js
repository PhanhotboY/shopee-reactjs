import axios from '../axios';

const userService = {
    handleLogin(email, password) {
        return axios.post(`/api/users/login`, { email, password });
    },

    handleSignup(signupData) {
        return axios.post(`/api/users/signup`, signupData);
    },

    handleGetAllUser() {
        return axios.get(`/api/users?limit=30`);
    },

    handleGetUser(id) {
        return axios.get(`/api/users/${id}`);
    },

    handleGetDeletedUser() {
        return axios.get(`/api/users?limit=100&deleted=true`);
    },

    handleUpdateUser(updateData) {
        return axios.put(`/api/users`, updateData);
    },

    handleDeleteUser(id) {
        return axios.delete(`/api/users/${id}`);
    },

    handleDeletePermanentlyUser(id) {
        return axios.delete(`/api/users/${id}?permanently=true`);
    },

    handleRestoreItem(id) {
        return axios.patch(`/api/users/${id}`, { action: 'restore' });
    },
};

export default userService;
