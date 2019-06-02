const express = require('express')
const router = express.Router()
const {Prescription} = require('../domain/prescription')
const {StateMachine} = require('../state-machine/state-machine')
const {newBadRequestError, isBusinessError} = require('../utils/errors')

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

module.exports = router