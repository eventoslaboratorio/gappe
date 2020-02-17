/* eslint-disable consistent-return */
const { firebase } = require('../config/firebase')
const { configEvent, configURL } = require('../config/config')

module.exports = {
    async index(req, res, next) {
        try {
            const config = configURL(req);
            console.log(config);

            await firebase
                .database()
                .ref(config.uri)
                .once('value')
                .then(snap => snap.val())
                .then(val => {
                    if (config.modo === "raiz") {
                        const chaves = Object.keys(val);
                        let events = [];
                        for (const chave of chaves) {
                            if(!config.events||config.events.includes(chave))
                                events.push(
                                    configEvent({
                                        chaveRaiz: chave,
                                        modo: "item",
                                        uri: "events/" + chave
                                    }, val[chave]));
                        }
                        return events;
                    }
                    return configEvent(config, val);
                }).then((val) => res.json(val)).catch(error => {
                    return res.status(500);
                });
        } catch (error) {
            return res.status(error);
        }
    },
    async store(req, res, next) {
        try {
            const config = configURL(req)

            if (req.body.key) {
                const ref = await firebase.database().ref(config.uri + "/" + req.body.key);
                delete (req.body.subevents);
                ref.update(req.body);
                res.json({ uri: req.body.uri });
            } else {
                const ref = await firebase.database().ref(config.uri);
                const novoEvento = ref.push(req.body);
                const uri = (config.uri + (config.uri.endsWith("/") ? "" : "/") + novoEvento.key);
                res.json({ uri });
            }
        } catch (error) {
            return res.status(500);
        }
    },
    async drop(req, res, next) {
        try {
            const config = configURL(req);
            await firebase.database().ref(config.uri).remove();
            res.json({ ok: true });
        } catch (error) {
            res.status(500);
        }
    }
}