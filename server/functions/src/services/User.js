const { firebase } = require('../config/firebase')
const { encode, decode } = require('../config/JWT')
const { incripit, decripit } = require('../config/AUTH')
const { getEmail } = require('./GetEmail')

const ref = firebase.database().ref('users')
module.exports = {
    async login(req, res, next) {
        if (!req.body.email || !req.body.password)
            return res.json({ error: 'Usuário/Senha inválio email 1' })

        const user = await getEmail(req.body.email)

        if (!user) return res.json({ error: 'Usuário/Senha inválio email 2' })

        const [{ email, name, password }] = Object.values(user.val());
        const [uid] = Object.keys(user.val());

        const equals = decripit(req.body.password, password)

        if (!equals) return res.json({ error: 'Usuário/Senha inválio 3' })

        // segundos
        const agora = Math.floor(Date.now() / 1000)
        let userJWT = {
            uid,
            email,
            name,
            iat: agora,
            exp: agora + (60)
        };

        const token = encode(userJWT)

        return res.json({
            user: { email, name },
            token
        })
    },
    async store(req, res, next) {
        const { password, name, email } = req.body
        const userEmailBanco = await getEmail(email)

        if (userEmailBanco) return res.json({ error: 'Email indisponível' })

        const user = {
            name,
            email,
            password: incripit(password)
        }

        const response = await ref.push(user)

        const userAdd = await ref.child(response.key).limitToFirst(2).once('value')

        return res.json(userAdd.val())
    },
    async validarToken(req, res, next) {
        try {
            const response = await decode(req.headers.token)

            return res.json(response)
        } catch (error) {
            return res.json({ error: 'Sessão expirada' })
        }
    }
}