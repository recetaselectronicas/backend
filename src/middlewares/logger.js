const loggerMiddleware = (req, res, next) => {
  const { logger } = req.app.locals
  logger.info(`${req.method} to ${req.originalUrl} ${req.method === 'POST' || req.method === 'PUT' ? `with payload: ${JSON.stringify(req.body)}` : ''}`)
  return next()
}

module.exports = loggerMiddleware
