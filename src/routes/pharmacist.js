const express = require('express')
const router = express.Router()
const { PharmacistRepository } = require('../repositories/pharmacistRepository')

router.get('/', (req, res, next) => {
    return PharmacistRepository.getAll()
    .then(pharmacists => {
        return res.json(pharmacists.map(pharmacist => pharmacist.toPlainObject()))
    })
    .catch(next)
})
module.exports = router 