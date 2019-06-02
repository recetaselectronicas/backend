const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()

const loggerMiddleware = require('../middlewares/logger')
const prescriptionsRouter = require('./prescriptions')

appRouter.use(bodyParser.json())
appRouter.use(loggerMiddleware)
appRouter.use('/', require('./session'))
appRouter.use('/', prescriptionsRouter)
appRouter.use('/', require('../middlewares/error-handler'))

module.exports = appRouter