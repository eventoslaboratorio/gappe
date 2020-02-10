// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dev = true;
if (dev) {
    var serviceAccount = require("../keys/serviceAccountKey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://gappe-v2.firebaseio.com"
    });
}
else
    admin.initializeApp();
const router = express.Router();
const TradutorModo = {
    subevents: "subevents",
    img: "imagem"
};

function configURL(req) {
    let resposta = {};
    resposta.uri = "events/";
    if (!req.params[0] || req.params[0] === "/")
        resposta.modo = "raiz";
    else {
        resposta.uri += req.params[0];
        let suburl = req.params[0].split("/");
        console.log(suburl);
        if (!suburl[suburl.length - 1])
            suburl.pop();
        const ultimo = suburl[suburl.length - 1];
        if (TradutorModo[ultimo])
            resposta.modo = TradutorModo[ultimo];
        else {
            resposta.modo = "item";
            resposta.chaveRaiz = ultimo;
        }
    }
    return resposta;
}


router.delete(['/events/*'], async (req, res, next) => {
    try {
        const config = configURL(req);
        admin.database().ref(config.uri).remove();
        res.json({ ok:true});
    } catch (e) {
        console.error(e);
        res.error(500);
    }
});

router.post(['/events/', '/events/*'], async (req, res, next) => {
    try {
        const config = configURL(req);
        if (req.body.key) {
            const ref = admin.database().ref(config.uri + "/" + req.body.key);
            delete (req.body.subevents);
            ref.set(req.body);
            res.json({ uri: req.body.uri });
        } else {
            const ref = admin.database().ref(config.uri);
            const novoEvento = ref.push();
            novoEvento.set(req.body);
            const uri = (config.uri + (config.uri.endsWith("/") ? "" : "/") + novoEvento.key);
            res.json({ uri });
        }
    } catch (e) {
        console.error(e);
        res.error(500);
    }
});

function configEvent(configUrl, event) {
    event.key = configUrl.chaveRaiz;
    if (configUrl.modo === "item")
        event.uri = configUrl.uri;
    else
        event.uri = (configUrl.uri + (configUrl.uri.endsWith("/") ? "" : "/") + configUrl.chave);
    if (event.subevents) {
        const chaves = Object.keys(event.subevents);
        for (const chave of chaves) {
            event.subevents[chave].key = chave;
            event.subevents[chave].uri = event.uri + "/subevents/" + chave;
            event.subevents[chave].subevents = null;
        }
        event.subevents = Object.values(event.subevents);
    }


    return event;

}

router.get(['/events/', '/events/*'], async (req, res, next) => {
    try {
        const config = configURL(req);
        admin
            .database()
            .ref(config.uri)
            .once("value")
            .then(snap => snap.val())
            .then(val => {
                if (config.modo === "raiz") {
                    const chaves = Object.keys(val);
                    let events = [];
                    for (const chave of chaves) {
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
                console.error(error);
                res.error(500);
            });

        //res.json({teste:"casa"});
    } catch (e) {
        console.error(e);
        res.error(500);
    }
});


const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/', router);
//app.use(methodOverride())
app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message
    });
});

exports.api = functions.https.onRequest(app);
