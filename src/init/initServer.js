const {logger} = require('../utils/utils')
const init = () => {
    const express = require('express')
    const bodyParser = require('body-parser')
    const app = express()
    const port = 8080

    app.use('/', require('../routes/index.js'))

    app.listen(port, () => {
        logger.info(`Server up & running on ${port}`)
    })
    return app;
}

module.exports = {init}