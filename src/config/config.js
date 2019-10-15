const config = {
  executeBootstrap: {
    mongo: false,
    mysql: false
  },
  executeDaemon: {
    issued: true,
    expired: false
  },
  conections: {
    mongo: {
      host: 'localhost',
      port: 27017
    }
  }
}

module.exports = { config }
