const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()
const medicalInsuranceRouter = require('./medicalInsurance')  

appRouter.use('/ping',(req,res)=>res.status(200).send({message:"pong"}));
appRouter.use('/', require('./session'))
appRouter.use('/medical-insurance',medicalInsuranceRouter)
appRouter.use(require('../middlewares/error-handler'))

module.exports = appRouter