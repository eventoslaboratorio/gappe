const functions = require('firebase-functions');
const cors = require('cors');
const bodyParser = require("body-parser");
const { app, express } = require('./src/config/express');
const { onCreate, onDelete } = require('./src/triggers/User')

// routes
require('./src/config/routes')(app)

app.use(express.json())
app.use(cors({ origin: true }))
app.use(bodyParser.json());

exports.api = functions.https.onRequest(app);

exports.triggerUserOnCreate = onCreate;

exports.triggerUserOnDelte = onDelete;