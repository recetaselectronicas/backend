const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    return res.status(500).json(err)
}

module.exports = errorHandler