const express = require('express')

const appRouter = express.Router()
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token')

const cors = require('cors')
const medicalInsuranceRouter = require('./medicalInsurance')
const institutionRouter = require('./institution')
const doctorsRouter = require('./doctors')
const pingRouter = require('./ping')
const prescriptionsRouter = require('./prescriptions')
const affiliateRouter = require('./affiliate')
const medicineRouter = require('./medicine')
const pharmacistRouter = require('./pharmacist')
const normsRouter = require('./norm')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const sessionRouter = require('./session')
const authorizationsRouter = require('./authorizations')
const loggerMiddleware = require('../middlewares/logger')
const errorHandler = require('../middlewares/error-handler')
const secureMiddleware = require('../middlewares/secure')

appRouter.use(cors())
appRouter.use('/ping', pingRouter)
appRouter.use(bodyParser.json())
appRouter.use(loggerMiddleware)
appRouter.use('/login', loginRouter)

appRouter.use(bearerToken()) // middleware que obtiene el token del body, params, header o cookies. (solo usamos el token en el header)
appRouter.use(secureMiddleware)

appRouter.use('/logout', logoutRouter)
appRouter.use('/session', sessionRouter)
appRouter.use('/authorizations', authorizationsRouter)
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
