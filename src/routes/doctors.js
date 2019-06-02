const express = require('express')
const router = express.Router()
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')

router.get('/:id/medical-insurances', async (req, res, next) => {
  const doctorId = req.params.id
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getMedicalInsuranceByMedic(doctorId)
    return res.status(200).send(medicalInsurances)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
