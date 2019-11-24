/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const express = require('express')

const router = express.Router()
const moment = require('moment')
const { Prescription } = require('../domain/prescription')
const { StateMachine } = require('../state-machine/state-machine')
const { newBadRequestError, isBusinessError } = require('../utils/errors')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { getPrescriptionsStatistics } = require('../useCases/statistics/getPrescriptionsStatistics')
const { downloadPrescriptionStatistics } = require('../useCases/statistics/downloadPrescriptionStatistics')
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

router.post('/verify', async (req, res, next) => {
  const { identifiedUser } = req
  if (!identifiedUser.canIssue()) {
    return next(errors.newForbiddenResourceException('No puede emitir la receta, no tiene los permisos necesarios'))
  }
  let prescription = Prescription.fromObject(req.body)
  prescription.doctor.id = identifiedUser.id
  try {
    prescription = await PrescriptionRepository.fillPrescriptionData(prescription, false)
    await StateMachine.toIssued(prescription, false)
    return res.status(200).json()
  } catch (err) {
    if (isBusinessError(err)) {
      return next(newBadRequestError('Invalid prescription payload', err, 400))
    }
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

router.post('/statistics', async (req, res, next) => {
  const { identifiedUser, body } = req
  try {
    const results = await getPrescriptionsStatistics(identifiedUser, body)
    return res.json(results)
  } catch (error) {
    return next(error)
  }
})

router.post('/statistics/download', async (req, res, next) => {
  const { identifiedUser, body, query } = req
  try {
    const results = await downloadPrescriptionStatistics(identifiedUser, body, query.type)
    if (results.type === 'csv') {
      res.setHeader('Content-Disposition', 'attachment; filename="statistics.csv"')
      res.type('text/csv')
      return res.send(results.data)
    }
    if (results.type === 'xml') {
      res.setHeader('Content-Disposition', 'attachment; filename=statistics.xml')
      res.type('application/xml')
      return res.send(results.data)
    }
    if (results.type === 'json') {
      res.setHeader('Content-Disposition', 'attachment; filename=statistics.json')
      res.type('application/json')
      return res.send(results.data)
    }
    throw errors.newBadRequestError('invalid exported format')
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', verifiers.viewVerifier, (req, res, next) => {
  const { identifiedUser } = req
  const { prescription } = req
  const actions = identifiedUser.getActions(prescription)
  return res.json({ result: (prescription.toPlainObject && prescription.toPlainObject()) || prescription, actions })
})

router.put('/:id', verifiers.receiveVerifier, verifiers.cancelVerifier, (req, res, next) => {
  const { identifiedUser } = req
  const { body } = req
  const { id } = req.params
  return PrescriptionRepository.getById(id)
    .then(prescription => toState[body.status].change(prescription, { ...body.data, identifiedUser, updatePrescription: true }))
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

router.put('/:id/verify', (req, res, next) => {
  const { identifiedUser } = req
  const { body } = req
  const { id } = req.params
  return PrescriptionRepository.getById(id)
    .then(prescription => toState[body.status].change(prescription, { ...body.data, identifiedUser, updatePrescription: false }))
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
      return StateMachine.toCancelled(prescription, data.updatePrescription)
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

      return PrescriptionRepository.fillPrescriptionItemsData(prescription).then(_prescription => StateMachine.toReceive(_prescription, data.updatePrescription))
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

      return PrescriptionRepository.fillPrescriptionItemsData(prescription).then(_prescription => StateMachine.toAudit(_prescription, data.updatePrescription))
    }
  }
}

module.exports = router
