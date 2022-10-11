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

    handleGetDeletedUser(id) {
        return axios.get(`/api/get-deleted/user`);
    },

    handleUpdateUser(updateData) {
        return axios.put(`/api/update/user`, updateData);
    },

    handleDeleteUser(id) {
        return axios.delete(`/api/delete/user?id=${id}`);
    },
};

export default userService;
