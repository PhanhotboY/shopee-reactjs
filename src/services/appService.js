import axios from '../axios';

const appService = {
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

    async attachPaymentMethod(paymentMethod) {
        return await axios.post('/api/checkout/payment/attach-method', paymentMethod);
    },

    async getPaymentMethods() {
        return await axios.get('/api/checkout/payment/methods');
    },

    async createPaymentIntent(order) {
        return await axios.post('/api/checkout/payment/create-intent', order);
    },

    async confirmPaymentIntent(intentId, methodId) {
        return await axios.post('/api/checkout/payment/confirm', { intentId, methodId });
    },
};

export default appService;
