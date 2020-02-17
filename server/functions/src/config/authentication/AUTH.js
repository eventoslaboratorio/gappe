const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync();
module.exports = {
    incripit(password) {
        return bcrypt.hashSync(password, salt)
    },
    decripit(passwordUser, passwordBanco) {
        return bcrypt.compareSync(passwordUser, passwordBanco)
    }
}