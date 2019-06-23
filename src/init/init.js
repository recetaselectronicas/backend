// TODO: manejar el asincronismo
const initDatabase = require('./initDatabase').init
const initServer = require('./initServer').init
const initDaemon = require('./initDaemon').init

const init = async () => {
  await initDatabase()
  initServer()
  initDaemon()
}

module.exports = { init }
