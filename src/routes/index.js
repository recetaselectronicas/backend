const express = require('express')
const appRouter = express.Router()
const bodyParser = require('body-parser')

const medicalInsuranceRouter = require('./medicalInsurance')
const doctorsRouter = require('./doctors')
const pingRouter = require('./ping')
const prescriptionsRouter = require('./prescriptions')
const session = require('./session')
const loggerMiddleware = require('../middlewares/logger')
const errorHandler = require('../middlewares/error-handler')

appRouter.use('/ping', pingRouter)
appRouter.use(bodyParser.json())
appRouter.use(loggerMiddleware)
appRouter.use('/login', session)
appRouter.use('/prescriptions', prescriptionsRouter)
appRouter.use('/medical-insurances', medicalInsuranceRouter)
appRouter.use('/doctors', doctorsRouter)
appRouter.use(errorHandler)

module.exports = appRouter
