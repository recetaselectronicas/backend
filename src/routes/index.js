const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()

appRouter.use('/', require('./session'))
appRouter.use('/', require('../middlewares/error-handler'))

module.exports = appRouter