const { index, store, drop } = require('../services/Evento')

module.exports = app => {
    app.get(['/events/', '/events/*'], index);
    app.post(['/events/', '/events/*'], store);
    app.delete(['/events/*'], drop);
}