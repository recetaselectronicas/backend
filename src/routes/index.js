const express = require('express')
const bodyParser = require('body-parser')
const appRouter = express.Router()

appRouter.use('/', require('./session'))

module.exports = appRouter