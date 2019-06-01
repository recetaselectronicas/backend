const {logger} = require('../utils/utils')

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    if (err.code){
        return res.status(err.status).json(err)
    }
    logger.error(err.stack)
    return res.status(500).json(err)
}

module.exports = errorHandler