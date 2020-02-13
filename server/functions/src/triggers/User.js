const { firebase, userAdd } = require('../config/firebase')

module.exports = {
    onCreate: userAdd.user().onCreate(user => {
        const userObject = {
            email: user.email,
            uid: user.uid,
            password: user.pas
        }
        firebase.database().ref(`users/${user.uid}`).set(userObject)
        return true;
    }),
    onDelete: userAdd.user().onDelete(user => {
        firebase.database().ref('users').child(user.uid).remove();
        return true;
    })
}