const functions = require('firebase-functions');
const cors = require('cors');
const bodyParser = require("body-parser");
const { app, express } = require('./src/config/express');

// triggers
const { onEventoAdd } = require('./src/triggers/Evento')

// routes
require('./src/config/routes')(app)


app.use(express.json())
app.use(bodyParser.json());
app.use(cors({ origin: true }))

exports.api = functions.https.onRequest(app);

exports.triggerEventoOnAdded = onEventoAdd;