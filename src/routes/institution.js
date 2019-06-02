const express = require('express')
const router = express.Router()
const { InstitutionRepository } = require('../repositories/institutionRepository')

router.get('/', async (req, res, next) => {
  try {
    const institutions = await InstitutionRepository.getAll()
    return res.status(200).send(institutions)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
