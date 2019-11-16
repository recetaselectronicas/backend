const express = require('express')

const router = express.Router()
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')

router.get('/', async (req, res, next) => {
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getAllWithPlans()
    return res.status(200).send(medicalInsurances.map(medicalInsurance => medicalInsurance.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getById(id)
    return res.json(medicalInsurances.toPlainObject())
  } catch (e) {
    return next(e)
  }
})

module.exports = router
