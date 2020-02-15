const { login, store, validarToken } = require('../services/User')

module.exports = app => {
    app.get('/user', login);
    app.post('/user', store);
    app.put('/user', validarToken);
}