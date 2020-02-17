module.exports = {
    configURL(req) {
        const TradutorModo = {
            subevents: "subevents",
            img: "imagem"
        };

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
    },
    configEvent(configUrl, event) {
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
}