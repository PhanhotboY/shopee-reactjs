if (process.env.NODE_ENV === 'production') {
    module.exports = require('./env/prod.config');
} else {
    module.exports = require('./env/dev.config');
}
