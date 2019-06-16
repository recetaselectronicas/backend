const express = require('express')

const router = express.Router()
const { Prescription } = require('../domain/prescription')
const { StateMachine } = require('../state-machine/state-machine')
const { newBadRequestError, isBusinessError } = require('../utils/errors')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const permissions = require('../permissions/identifiedUser')
const errors = require('../utils/errors')

router.post('/', (req, res, next) => {
  const { logger } = req.app.locals
  const prescription = Prescription.fromObject(req.body)
  return StateMachine.toIssued(prescription)
    .then(createdPrescription => res.status(201).json(createdPrescription.toPlainObject()))
    .catch((err) => {
      if (isBusinessError(err)) {
        return next(newBadRequestError('Invalid prescription payload', err, 400))
      }
      return next(err)
    })
})

const secureMiddleware = (req, res, next) => {
  req.identifiedUser = permissions.getIdentifiedAffiliate(1)
  return next()
}
const secureMiddleware2 = (req, res, next) => {
  req.identifiedUser = permissions.getIdentifiedPharmacist(1)
  return next()
}
const secureMiddleware3 = (req, res, next) => {
  req.identifiedUser = permissions.getIdentifiedDoctor(1)
  return next()
}

router.get('/', secureMiddleware, (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  console.log(req.query.status)
  const prescriptionQuery = identifiedUser.getQuery(req.query)
  console.log('prescriptionQuery', prescriptionQuery)
  return PrescriptionRepository.getByQuery(prescriptionQuery)
    .then((prescriptions) => {
      const filters = identifiedUser.getFilters()
      const response = { result: prescriptions.map(pres => pres.toPlainObject()), ...filters }
      return res.json(response)
    })
    .catch(next)
})

router.get('/:id', secureMiddleware, (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  return PrescriptionRepository.getById(req.params.id)
    .then((prescription) => {
      identifiedUser.checkForbiden(prescription)
      const actions = identifiedUser.getActions(prescription)
      return res.json({ result: prescription.toPlainObject(), actions })
    })
    .catch(next)
})

router.put('/:id', secureMiddleware3, (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const body = req.body
  return PrescriptionRepository.getById(req.params.id)
    .then((prescription) => {
      return toState[body.status].change(prescription, { ...body.data, identifiedUser })

    })
    .then(updatePrescription => res.status(200).json(updatePrescription.toPlainObject()))
    .catch((err) => {
      if (isBusinessError(err)) {
        return next(newBadRequestError('Invalid prescription payload', err, 400))
      }
      //TODO:Definir catcheo para no perder errores
      return next(err)
    })
})


const toState = {
  CANCELLED: {
    change: (prescription, data) => {
      prescription.statusReason = data.reason
      if (!data.identifiedUser.canCancel()) {
        throw errors.newForbiddenResourceException("No puede cancelar la receta")
      }
      //TODO: Agregar en objeto de presciption el atributo statusReason
      return StateMachine.toCancelled(prescription)
    }
  },
  RECEIVE: {
    change: (prescription, data) => {
      if (!data.identifiedUser.canReceive()) {
        throw errors.newForbiddenResourceException("No puede recepcionar la receta")
      }
      data.items.forEach(item => {
        let received = prescription.items.find(i => i.id = item.id).received
        received.medicine = item.medicine
        received.quantity = item.quantity
        received.pharmacist.id = data.identifiedUser.id
        received.soldDate = item.soldDate
      })
      //TODO: Agregar en objeto de presciption el atributo statusReason
      return StateMachine.toReceive(prescription)
    }
  }

}

module.exports = router
