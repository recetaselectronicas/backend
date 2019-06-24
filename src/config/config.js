const config = {
  executeBootstrap: {
    mongo: false,
    relational: false
  },
  conections: {
    mongo: {
      host: 'localhost',
      port: 27017
    }
  }
}

module.exports = { config }
