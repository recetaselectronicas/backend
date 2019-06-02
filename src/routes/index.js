const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()
const medicalInsuranceRouter = require('./medicalInsurance')
const institution = require('./institution')
const ping = require('./ping')

appRouter.use('/ping', ping)
appRouter.use('/', require('./session'))
appRouter.use('/medical-insurance', medicalInsuranceRouter)
appRouter.use('/institution', institution)
appRouter.use(require('../middlewares/error-handler'))

module.exports = appRouter
