const firebaseApp = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./key/serviceAccountKey.json");

module.exports = {
    firebase: firebaseApp.initializeApp({
        credential: firebaseApp.credential.cert(serviceAccount),
        databaseURL: "https://gappe-v2.firebaseio.com"
    }),
    auth: firebaseApp.auth(),
    userAdd: functions.auth,
    configJWT: serviceAccount.private_key
}