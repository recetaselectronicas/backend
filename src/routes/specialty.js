const express = require('express')

const router = express.Router()
const { DoctorRepository } = require('../repositories/doctorRepository')

router.get('/', async (req, res, next) => {
  try {
    const specialties = await DoctorRepository.getAllSpecialties()
    return res.status(200).json(specialties)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
