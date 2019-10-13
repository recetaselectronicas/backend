const express = require('express')

const router = express.Router()
const moment = require('moment')
const { Prescription } = require('../domain/prescription')
const { StateMachine } = require('../state-machine/state-machine')
const { newBadRequestError, isBusinessError } = require('../utils/errors')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const verifiers = require('../middlewares/verifiers')
const errors = require('../utils/errors')

router.post('/', verifiers.issueVerifier, async (req, res, next) => {
  const { logger } = req.app.locals
  const { identifiedUser } = req
  if (!identifiedUser.canIssue()) {
    return next(errors.newForbiddenResourceException('No puede emitir la receta, no tiene los permisos necesarios'))
  }
  let prescription = Prescription.fromObject(req.body)
  prescription.doctor.id = identifiedUser.id
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

router.put('/:id', verifiers.receiveVerifier, (req, res, next) => {
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
      // TODO: Agregar en objeto de presciption el atributo statusReason
      prescription.statusReason = data.reason
      if (!data.identifiedUser.canCancel()) {
        throw errors.newForbiddenResourceException('No puede cancelar la receta')
      }
      return StateMachine.toCancelled(prescription)
    }
  },
  RECEIVE: {
    change: (prescription, data) => {
      if (!data.identifiedUser.canReceive()) {
        throw errors.newForbiddenResourceException('No puede recepcionar la receta')
      }
      data.items.forEach((item) => {
        const itemToReceive = prescription.items.find(_item => _item.id === item.id)
        if (!itemToReceive) {
          throw errors.newBadRequestError('Item inválido')
        }
        if (itemToReceive.received.medicine.id) {
          throw errors.newEntityAlreadyCreated('No puede recepcionar el item. Ya fue recepcionado')
        }
        itemToReceive.receive(item.quantity, moment(), item.medicine, { id: data.identifiedUser.id })
      })

      return PrescriptionRepository.fillPrescriptionItemsData(prescription).then(_prescription => StateMachine.toReceive(_prescription))
    }
  },
  AUDIT: {
    change: (prescription, data) => {
      if (!data.identifiedUser.canAudit()) {
        throw errors.newForbiddenResourceException('No puede auditar la receta')
      }
      data.items.forEach((item) => {
        const itemToAudit = prescription.items.find(_item => _item.id === item.id)
        itemToAudit.audit(item.quantity, item.medicine)
      })

      return PrescriptionRepository.fillPrescriptionItemsData(prescription).then(_prescription => StateMachine.toAudit(_prescription))
    }
  }
}

module.exports = router
