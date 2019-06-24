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
    .then(doctors => res.json(doctors.map(doctor => doctor.toPlainObject())))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const doctor = await DoctorRepository.getById(id)
    return res.json(doctor.toPlainObject())
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

module.exports = router
