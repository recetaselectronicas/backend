const express = require('express')
const router = express.Router()
const {Prescription} = require('../domain/prescription')
const {StateMachine} = require('../state-machine/state-machine')
const {newBadRequestError, isBusinessError} = require('../utils/errors')
const {PrescriptionRepository} = require('../repositories/prescriptions-repository')
const filters = require('../filters/prescriptionFilters')

router.post('/', (req, res, next) => {
    const {logger} = req.app.locals
    const prescription = Prescription.fromObject(req.body)
    return StateMachine.toIssued(prescription)
    .then(createdPrescription => {
        return res.status(201).json(createdPrescription.toPlainObject())
    })
    .catch(err => {
        if (isBusinessError(err)){
            return next(newBadRequestError('Invalid prescription payload', err, 400))
        }
        return next(err)
    })
})

const secureMiddleware = (req, res, next) => {
    req.identifiedUser = {
        type: 'affiliate',
        id: 1
    }
    return next()
}

const filtersBy = {
    affiliate: {getFilters: filters.getAffiliateAvailableFilters},
    doctor: {getFilters: filters.getDoctorAvailableFilters},
    pharmacist: {getFilters: filters.getPharmacistAvailableFilters},
    medicalInsurance: {getFilters: filters.getMedicalInsuranceAvailableFilters}
}

const queryBy = {
    affiliate: {getQuery: filters.getAffiliateQueryByParams},
    doctor: {getQuery: filters.getDoctorQueryByParams},
    pharmacist: {getQuery: filters.getPharmacistQueryByParams},
    medicalInsurance: {getQuery: filters.getMedicalInsuranceQueryByParams},
}

router.get('/', secureMiddleware, (req, res, next) => {
    const {logger} = req.app.locals
    const prescriptionQuery = queryBy[req.identifiedUser.type] && queryBy[req.identifiedUser.type].getQuery(req.query) || {}
    return PrescriptionRepository.getByQuery(prescriptionQuery)
    .then(prescirptions => {
        const filters = filtersBy[req.identifiedUser.type] && filtersBy[req.identifiedUser.type].getFilters() || {}
        const response = {result: prescirptions.map(pres => pres.toPlainObject()), ...filters}
        return res.json(response)
    })
    .catch(err => {
        return next(err)
    })
})

module.exports = router