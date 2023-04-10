const env = process.env;

module.exports = {
    backendURL: env.REACT_APP_BACKEND_URL,
    imageURL: env.REACT_APP_IMAGE_URL,
    stripePublishableKey: env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
};
