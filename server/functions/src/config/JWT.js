const jwt = require('jwt-simple')
const { configJWT } = require('./firebase')

module.exports = {
    encode(user) {
        return jwt.encode(user, configJWT)
    },
    async decode(user) {
        return await jwt.decode(user, configJWT)
    }
}