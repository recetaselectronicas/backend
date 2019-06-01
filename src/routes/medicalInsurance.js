const express = require('express')
const router = express.Router()
const {MedicalInsuranceRepository} =  require('../repositories/medicalInsuranceRepository');
router.get('/', async (req, res, next) => {
    const medicalInsurances = await MedicalInsuranceRepository.getAll();
    return res.status(200).send(medicalInsurances)
})

module.exports = router