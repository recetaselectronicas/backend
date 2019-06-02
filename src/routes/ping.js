const express = require('express')
const router = express.Router()
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')

router.get('/', (req, res) => res.status(200).send({ message: 'pong' }))
module.exports = router
