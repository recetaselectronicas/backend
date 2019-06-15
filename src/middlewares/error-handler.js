const { isBusinessError } = require('../utils/errors')

const errorHandler = (err, req, res, next) => {
  const { logger } = req.app.locals
  if (res.headersSent) {
    return next(err)
  }
  if (isBusinessError(err)) {
    return res.status(err.status).json(err)
  }
  logger.error(err.stack)
  return res.status(500).json(err)
}

module.exports = errorHandler
