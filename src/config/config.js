const config = {
  executeBootstrap: {
    mongo: true,
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
