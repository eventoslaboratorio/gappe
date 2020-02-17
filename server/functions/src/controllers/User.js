const { login, store, validarToken } = require('../services/User')

module.exports = app => {
    app.post('/user/login', login);
    app.post('/user/add', store);
    app.get('/user/token', validarToken);
}