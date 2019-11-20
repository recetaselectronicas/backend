const express = require('express')
const moment = require('moment')

const router = express.Router()
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { DoctorRepository } = require('../repositories/doctorRepository')
const { searchByQuery } = require('../useCases/searchs/doctors/searchByQuery')

router.get('/medical-insurances', async (req, res, next) => {
  const { identifiedUser } = req
  const doctorId = identifiedUser.id
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getMedicalInsuranceByMedic(doctorId, moment())
    return res.status(200).send(medicalInsurances.map(medicalInsurance => medicalInsurance.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const doctors = await searchByQuery(req.query)
    return res.json(doctors.map(doctor => doctor.toPlainObject()))
  } catch (e) {
    return next(e)
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
    return next(e)
  }
})

module.exports = router
