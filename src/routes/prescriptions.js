const express = require('express')
const router = express.Router()
const {Prescription} = require('../domain/prescription')
const {StateMachine} = require('../state-machine/state-machine')
const {newBadRequestError, isBusinessError} = require('../utils/errors')
const {PrescriptionRepository} = require('../repositories/prescriptions-repository')
const permissions = require('../permissions/identifiedUser')

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
    req.identifiedUser = permissions.getIdentifiedMedicalInsurance(1)
    return next()
}

router.get('/', secureMiddleware, (req, res, next) => {
    const {logger} = req.app.locals
    const {identifiedUser} = req
    const prescriptionQuery = identifiedUser.getQuery(req.query)
    return PrescriptionRepository.getByQuery(prescriptionQuery)
    .then(prescirptions => {
        const filters = identifiedUser.getFilters()
        const response = {result: prescirptions.map(pres => pres.toPlainObject()), ...filters}
        return res.json(response)
    })
    .catch(next)
})

router.get('/:id', secureMiddleware, (req, res, next) => {
    const {logger} = req.app.locals
    const {identifiedUser} = req
    return PrescriptionRepository.getById(req.params.id)
    .then(prescription => {
        identifiedUser.checkForbiden(prescription)
        return res.json(prescription.toPlainObject())
    })
    .catch(next)
})

module.exports = router