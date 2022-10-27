import axios from '../axios';

const userService = {
    handleLogin(email, password) {
        return axios.post(`/api/user/login`, {
            email,
            password,
        });
    },

    handleSignup(signupData) {
        return axios.post(`/api/user/signup`, signupData);
    },

    handleGetAllUser() {
        return axios.get(`/api/user/all?limit=30`);
    },

    handleGetUser(id) {
        return axios.get(`/api/user/single?id=${id}`);
    },

    handleGetDeletedUser() {
        return axios.get(`/api/user/all?limit=100&isDeleted=true`);
    },

    handleUpdateUser(updateData) {
        return axios.put(`/api/user/update`, updateData);
    },

    handleDeleteUser(id) {
        return axios.delete(`/api/user/delete?id=${id}`);
    },

    handleDeletePermanentlyUser(id) {
        return axios.delete(`/api/user/delete?id=${id}&isPermanently=true`);
    },

    handleRestoreItem(id) {
        return axios.patch(`/api/user/restore?id=${id}`);
    },
};

export default userService;
