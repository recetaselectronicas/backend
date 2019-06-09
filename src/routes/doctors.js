const express = require('express')
const router = express.Router()
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { DoctorRepository } = require('../repositories/doctorRepository')

router.get('/:id/medical-insurances', async (req, res, next) => {
  const doctorId = req.params.id
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getMedicalInsuranceByMedic(doctorId)
    return res.status(200).send(medicalInsurances.map(medicalInsurance => medicalInsurance.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/', (req, res, next) => {
  DoctorRepository.getAll()
  .then(doctors => {
    return res.json(doctors.map(doctor => doctor.toPlainObject()))
  })
  .catch(next)
})

module.exports = router
