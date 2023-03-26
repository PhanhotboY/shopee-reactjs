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
        return await axios.get(`/api/users/${userId}/notifications`);
    },

    async handleGetSignedUrl(userId, file) {
        return await axios.post('/api/upload', {
            userId,
            file: {
                name: file.name,
                type: file.type,
            },
        });
    },
};

export default appService;
