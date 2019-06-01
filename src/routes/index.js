const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()

const prescriptionsRouter = require('./prescriptions')

appRouter.use('/', require('./session'))
appRouter.use('/', prescriptionsRouter)
appRouter.use('/', require('../middlewares/error-handler'))

module.exports = appRouter