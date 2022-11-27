import axios from '../axios';

const appService = {
    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    async handleGetAllcodes(type) {
        return await axios.get(`/api/allcodes/${type}`);
    },

    async handleGetNotifications(userId) {
        return axios.get(`/api/users/${userId}/notifications`);
    },
};

export default appService;
