const express = require('express')
const appRouter = express.Router()
const medicalInsuranceRouter = require('./medicalInsurance')
const institutionRouter = require('./institution')
const doctorsRouter = require('./doctors')
const pingRouter = require('./ping')

appRouter.use('/ping', pingRouter)
appRouter.use('/', require('./session'))
appRouter.use('/medical-insurances', medicalInsuranceRouter)
appRouter.use('/doctors', doctorsRouter)
appRouter.use(require('../middlewares/error-handler'))
appRouter.use('/institutions', institutionRouter)

module.exports = appRouter
