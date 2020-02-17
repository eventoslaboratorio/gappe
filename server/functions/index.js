const functions = require('firebase-functions');
const cors = require('cors');
const http = require('http')
const bodyParser = require("body-parser");
const { app, express } = require('./src/config/express');
const { setupWebsocket } = require('./src/config/websocket');

// triggers
const { onCreate, onDelete } = require('./src/triggers/User')
const { onEventoAdd } = require('./src/triggers/Evento')

// routes
require('./src/config/routes')(app)

const server = http.Server(app)
setupWebsocket(server)

app.use(express.json())
app.use(bodyParser.json());
app.use(cors({ origin: true }))

exports.api = functions.https.onRequest(app);

// exports.triggerUserOnCreate = onCreate;

// exports.triggerUserOnDelete = onDelete;

exports.triggerEventoOnAdded = onEventoAdd;