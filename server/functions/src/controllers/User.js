const { login, store } = require('../services/User')

module.exports = app => {
    app.get('/user', login);
    app.post('/user', store);
}