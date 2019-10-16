const express = require('express')
const { logger } = require('../utils/utils')

const init = () => {
  const app = express()
  const port = 8080

  app.locals.logger = logger

  app.use('/', require('../routes/index.js'))

  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      logger.info(`Server up & running on ${port}`)
    })
  }
  return app
}

module.exports = { init }
