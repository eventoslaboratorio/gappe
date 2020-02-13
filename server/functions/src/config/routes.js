module.exports = app => {
    require('../controllers/Evento')(app)
    require('../controllers/User')(app)
}