const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

const { firebase, auth } = require('../config/firebase')

module.exports = {
    async login(req, res, next) {

        const user = await firebase.database().ref('users')
            .orderByChild('email')
            .equalTo(req.body.email)
            .limitToFirst(1)
            .once('value')

        if (!user.val()) return res.json({ error: 'Usuário/Senha inválio' })

        const [{ email, name, password }] = Object.values(user.val());
        const [uid] = Object.keys(user.val());

        const equals = bcrypt.compareSync(req.body.password, password)

        if (!equals) return res.json({ error: 'Usuário/Senha inválio' })

        let additionalClaims = {
            premiumAccount: true,
            uid,
            email,
            name,
        };

        const token = await auth.createCustomToken(uid, additionalClaims)

        return res.json({
            user: { email, name },
            token
        })
    },
    async store(req, res, next) {
        const { password, name, email } = req.body

        const userEmail = await firebase.database().ref('users')
            .orderByChild('email')
            .equalTo(email)
            .limitToFirst(1)
            .once('value')

        if (userEmail.val())
            return res.json({ error: 'Email já cadastrado' })

        const salt = bcrypt.genSaltSync()
        const user = {
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        }

        const response = await firebase.database().ref('users').push(user)

        const userRes = await firebase.database().ref('users').child(response.key)
            .limitToFirst(2).once('value')

        return res.json(userRes.val())
    }
}