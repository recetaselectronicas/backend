const express = require('express')

const appRouter = express.Router()
const bodyParser = require('body-parser')

const medicalInsuranceRouter = require('./medicalInsurance')
const institutionRouter = require('./institution')
const doctorsRouter = require('./doctors')
const pingRouter = require('./ping')
const prescriptionsRouter = require('./prescriptions')
const affiliateRouter = require('./affiliate')
const medicineRouter = require('./medicine')
const pharmacistRouter = require('./pharmacist')
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
appRouter.use('/pharmacists', pharmacistRouter)
appRouter.use('/institutions', institutionRouter)
appRouter.use('/affiliates', affiliateRouter)
appRouter.use('/medicines', medicineRouter)
appRouter.use(errorHandler)


module.exports = appRouter
