import axios from '../axios';

const adminService = {
    /**
     * Đăng nhập hệ thống
     * {
     *  "username": "string",
     *  "password": "string"
     * }
     */
    handleGetAllcodes(type) {
        return axios.get(`/api/allcodes/${type}`);
    },
};

export default adminService;
