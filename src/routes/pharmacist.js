const express = require('express')

const router = express.Router()
const { PharmacistRepository } = require('../repositories/pharmacistRepository')

router.get('/', (req, res, next) => PharmacistRepository.getAll()
  .then(pharmacists => res.json(pharmacists.map(pharmacist => pharmacist.toPlainObject())))
  .catch(next))
module.exports = router
