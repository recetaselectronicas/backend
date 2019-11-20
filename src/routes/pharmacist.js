const express = require('express')

const router = express.Router()
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const { searchByQuery } = require('../useCases/searchs/pharmacists/searchByQuery')

router.get('/', (req, res, next) => PharmacistRepository.getAll()
  .then(pharmacists => res.json(pharmacists.map(pharmacist => pharmacist.toPlainObject())))
  .catch(next))

router.get('/search', async (req, res, next) => {
  try {
    const pharmacists = await searchByQuery(req.query)
    return res.json(pharmacists.map(pharmacist => pharmacist.toPlainObject()))
  } catch (e) {
    return next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const pharmacist = await PharmacistRepository.getById(id)
    return res.json(pharmacist.toPlainObject())
  } catch (e) {
    return next(e)
  }
})
module.exports = router
