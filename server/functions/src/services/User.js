const { firebase } = require('../config/firebase')
const { encode, decode } = require('../config/authentication/JWT')
const { incripit, decripit } = require('../config/authentication/AUTH')
const { getEmail } = require('./GetEmail')

const ref = firebase.database().ref('users')

module.exports = {
    async login(req, res, next) {
        const error = 'Usuário ou Senha inválido'

        if (!req.body.email || !req.body.password)
            return res.json({ error })

        const user = await getEmail(req.body.email)

        if (!user.val()) return res.json({ error })

        const [{ email, name, password }] = Object.values(user.val());
        const [uid] = Object.keys(user.val());

        const equals = decripit(req.body.password, password)

        if (!equals) return res.json({ error })

        // segundos
        const agora = Math.floor(Date.now() / 1000)
        const userJWT = {
            uid,
            email,
            name,
            iat: agora,
            exp: agora + (30)
        };

        const token = encode(userJWT)

        return res.json({
            user: { email, name },
            token
        })
    },
    async store(req, res, next) {
        const error = 'Email indisponível'
        const { password, name, email } = req.body

        const userEmailBanco = await getEmail(email)

        if (userEmailBanco.val()) return res.json({ error })

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
        const { token } = req.headers
        const error = 'Sessão expirada'
        try {
            const response = await decode(token)

            return res.json({ response, token })
        } catch (erro) {
            return res.json({ error })
        }
    }
}