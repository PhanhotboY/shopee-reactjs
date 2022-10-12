import axios from '../axios';

const userService = {
    handleLogin(email, password) {
        return axios.post(`/api/login`, {
            email,
            password,
        });
    },

    handleSignup(signupData) {
        return axios.post(`/api/signup`, signupData);
    },

    handleGetUser(id) {
        return axios.get(`/api/get/user?id=${id}`);
    },

    handleGetDeletedUser() {
        return axios.get(`/api/get-deleted/user`);
    },

    handleUpdateUser(updateData) {
        return axios.put(`/api/update/user`, updateData);
    },

    handleDeleteUser(id) {
        return axios.delete(`/api/delete/user?id=${id}`);
    },

    handleDeletePermanentlyUser(id) {
        return axios.delete(`/api/delete-permanently/user?id=${id}`);
    },

    handleRestoreItem(id) {
        return axios.patch(`/api/restore/user?id=${id}`);
    },
};

export default userService;
