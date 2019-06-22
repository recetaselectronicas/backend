const express = require('express')

const router = express.Router()
const { MedicineRepository } = require('../repositories/medicineRepository')

router.get('/', async (req, res, next) => {
  const { query } = req
  try {
    const medicines = await MedicineRepository.getByQuery(query)
    return res.status(200).send(medicines.map(medicine => medicine.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/troquel/:troquel', async (req, res, next) => {
  const { troquel } = req.params
  try {
    const medicine = await MedicineRepository.getByTroquel(troquel)
    return res.status(200).send(medicine.toPlainObject())
  } catch (error) {
    return next(error)
  }
})

module.exports = router
