import axios from '../axios';

const userService = {
    async handleLogin(email, password) {
        return await axios.post(`/api/users/login`, { email, password });
    },

    async handleSignup(signupData) {
        return await axios.post(`/api/users/signup`, signupData);
    },

    async handleGetAllUser() {
        return await axios.get(`/api/users?limit=30`);
    },

    async handleGetUser(id) {
        return await axios.get(`/api/users/${id}`);
    },

    async handleGetDeletedUser() {
        return await axios.get(`/api/users?limit=100&deleted=true`);
    },

    async handleUpdateUser(updateData) {
        return await axios.put(`/api/users/${updateData.id}`, updateData);
    },

    async handleDeleteUser(id) {
        return await axios.delete(`/api/users/${id}`);
    },

    async handlePermanentlyDeleteUser(id) {
        return await axios.delete(`/api/users/${id}?permanently=true`);
    },

    async handleRestoreUser(id) {
        return await axios.patch(`/api/users/${id}`, { action: 'restore' });
    },
};

export default userService;
