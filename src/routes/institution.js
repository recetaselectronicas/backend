const express = require('express')

const router = express.Router()
const { InstitutionRepository } = require('../repositories/institutionRepository')

router.get('/', async (req, res, next) => {
  try {
    const institutions = await InstitutionRepository.getAll()
    return res.status(200).send(institutions.map(institution => institution.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const institution = await InstitutionRepository.getById(id)
    return res.json(institution.toPlainObject())
  } catch (e) {
    return next(e)
  }
})

module.exports = router
