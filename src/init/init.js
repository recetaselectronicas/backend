//TODO: manejar el asincronismo
const initDatabase = require('./initDatabase').init
const initServer = require('./initServer').init

const init = () => {
  initDatabase()
  initServer()
}

module.exports = { init }
