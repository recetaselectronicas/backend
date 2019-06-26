const express = require('express')

const router = express.Router()
const { Prescription } = require('../domain/prescription')
const { StateMachine } = require('../state-machine/state-machine')
const { newBadRequestError, isBusinessError } = require('../utils/errors')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const errors = require('../utils/errors')
const moment = require('moment')

router.post('/', async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req

  let prescription = Prescription.fromObject(req.body)
  prescription.doctor.id = identifiedUser.id
  // TODO : dejar de mutar
  prescription = await PrescriptionRepository.fillPrescriptionData(prescription, false)
  let idCreatedPrescription
  try {
    idCreatedPrescription = await StateMachine.toIssued(prescription)
  } catch (err) {
    if (isBusinessError(err)) {
      return next(newBadRequestError('Invalid prescription payload', err, 400))
    }
    return next(err)
  }
  try {
    const createdPrescription = await PrescriptionRepository.getById(idCreatedPrescription)
    return res.status(201).json(createdPrescription.toPlainObject())
  } catch (err) {
    return next(err)
  }
})

router.get('/', async (req, res, next) => {
  const { identifiedUser } = req
  const prescriptionQuery = identifiedUser.getQuery(req.query)
  try {
    const prescriptions = await PrescriptionRepository.getByQuery(prescriptionQuery)
    const filters = await identifiedUser.getFilters()
    const response = { result: prescriptions.map(pres => pres.toPlainObject()), ...filters }
    return res.json(response)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser, query } = req
  return PrescriptionRepository.getById(req.params.id, query)
    .then((prescription) => {
      // identifiedUser.checkForbiden(prescription)
      const actions = identifiedUser.getActions(prescription)
      return res.json({ result: prescription.toPlainObject(), actions })
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  const { body } = req
  const { id } = req.params
  return PrescriptionRepository.getById(id)
    .then(prescription => toState[body.status].change(prescription, { ...body.data, identifiedUser }))
    .then(() => PrescriptionRepository.getById(id))
    .then(updatePrescription => res.status(200).json(updatePrescription.toPlainObject()))
    .catch((err) => {
      if (isBusinessError(err)) {
        return next(newBadRequestError('Invalid prescription payload', err, 400))
      }
      // TODO:Definir catcheo para no perder errores
      return next(err)
    })
})

const toState = {
  CANCELLED: {
    change: (prescription, data) => {
      prescription.statusReason = data.reason
      if (!data.identifiedUser.canCancel()) {
        throw errors.newForbiddenResourceException('No puede cancelar la receta')
      }
      // TODO: Agregar en objeto de presciption el atributo statusReason
      return StateMachine.toCancelled(prescription)
    }
  },
  RECEIVE: {
    change: (prescription, data) => {
      if (!data.identifiedUser.canReceive()) {
        throw errors.newForbiddenResourceException('No puede recepcionar la receta')
      }
      data.items.forEach((item) => {
        const itemToReceive = prescription.items.find(i => i.id == item.id)
        if (itemToReceive.received.quantity) {
          throw errors.newEntityAlreadyCreated('El item ya fué recepcionado')
        }
        itemToReceive.receive(item.quantity, moment(), item.medicine, { id: data.identifiedUser.id })
      })

      return StateMachine.toReceive(prescription)
    }
  },
  AUDIT: {
    change: (prescription, data) => {
      if (!data.identifiedUser.canAudit()) {
        throw errors.newForbiddenResourceException('No puede auditar la receta')
      }
      data.items.forEach((item) => {
        const itemToAudit = prescription.items.find(i => i.id == item.id)
        if (itemToAudit.audited.quantity) {
          throw errors.newEntityAlreadyCreated('El item ya fué auditado')
        }
        itemToAudit.audit(item.quantity, item.medicine)
      })

      return StateMachine.toAudit(prescription)
    }
  }
}

module.exports = router
