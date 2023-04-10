const env = process.env;

module.exports = {
    backendURL: 'https://localhost:6868',
    imageURL: env.REACT_APP_IMAGE_URL,
    stripePublishableKey: env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
};
