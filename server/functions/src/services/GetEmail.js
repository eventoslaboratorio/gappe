const { firebase } = require('../config/firebase')

module.exports = {
    async getEmail(email) {
        if (!email)
            return "error"

        return await firebase.database().ref('users')
            .orderByChild('email')
            .equalTo(email)
            .limitToFirst(1)
            .once('value')


    }
}