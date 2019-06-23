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
const normsRouter = require('./norm')
const session = require('./session')
const loggerMiddleware = require('../middlewares/logger')
const errorHandler = require('../middlewares/error-handler')

// CORS Support
appRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
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
appRouter.use('/norms', normsRouter)
appRouter.use(errorHandler)


module.exports = appRouter
