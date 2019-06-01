const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const {Prescription} = require('../domain/prescription')
const {logger} = require('../utils/utils')
const {StateMachine} = require('../state-machine/state-machine')
const {newBadRequestError} = require('../utils/errors')

router.post('/prescriptions', bodyParser.json(), (req, res, next) => {
    const prescription = Prescription.fromObject(req.body)
    StateMachine.toIssued(prescription)
    .then(createdPrescription => {
        return res.status(200).json({...createdPrescription})
    })
    .catch(err => {
        if (err.length){
            return next(newBadRequestError('Invalid prescription payload', err, 400))
        }
        return next(err)
    })
})

module.exports = router