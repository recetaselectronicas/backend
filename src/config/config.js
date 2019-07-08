const config = {
  executeBootstrap: {
    mongo: false,
    relational: false
  },
  executeDaemon: {
    issued: false,
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
