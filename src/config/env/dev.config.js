const env = process.env;

console.log(env);
module.exports = {
    backendURL: 'http://localhost:8080',
    imageURL: env.REACT_APP_IMAGE_URL,
};
