const { eventAdd } = require('../config/firebase')

// trigger para saber quando um novo evento foi adicionado
module.exports = {
    onEventoAdd: eventAdd.ref('events/{eventId}').onCreate(async (snapshot, context) => {
        return console.log(snapshot.val());
    }),
}