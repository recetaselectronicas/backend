const { isBusinessError, newUnexpectedError } = require('../utils/errors')

const errorHandler = (err, req, res, next) => {
  const { logger } = req.app.locals
  if (res.headersSent) {
    return next(err)
  }
  if (isBusinessError(err)) {
    return res.status(err.status || 400).json(err)
  }
  logger.error(err.stack || err.toString())
  return res.status(500).json(newUnexpectedError(null, err.stack))
}

module.exports = errorHandler
