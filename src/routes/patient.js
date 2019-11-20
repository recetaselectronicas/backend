const express = require('express')
const router = express.Router()
const { seachByNicNumberAndGender } = require('../useCases/searchs/patients/seachByNicNumberAndGender')


router.get('/search', async (req, res, next) => {
    // TODO : hacer para solo OS
    try {
        const patient = await seachByNicNumberAndGender(req.query)
        return res.json(patient)
    } catch (e) {
        return next(e)
    }
})

module.exports = router