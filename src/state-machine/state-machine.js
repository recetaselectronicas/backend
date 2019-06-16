const { states } = require('./state')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const moment = require('moment')

class StateMachine {
  constructor() {

  }

  toIssued(prescription) {
    prescription.setIssuedDate(moment())
    prescription.ttl = 30 // TODO: reemplazar con el llamado a tiempo de vida posta segun OS
    prescription.norm = 1 // TODO: reemplazar con el llamado a norma vigente segun OS
    return this.validateToIssued(prescription)
      .then(() => {
        prescription.status = states.ISSUED.status
        return PrescriptionRepository.create(prescription)
      })
  }

  validateToIssued(prescription) {
    return new Promise((resolve, reject) => {
      states.ISSUED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toCancelled(prescription) {
    return this.validateToCancelled(prescription)
      .then(() => {
        prescription.status = states.CANCELLED.status
        return PrescriptionRepository.update(prescription)
      })
  }

  validateToCancelled(prescription) {
    return new Promise((resolve, reject) => {
      states.CANCELLED.validate(prescription)
      //TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toConfirmed(prescription) {
    return this.validateToConfirmed(prescription)
      .then(() => {
        prescription.status = states.CONFIRMED.status
        return PrescriptionRepository.update(prescription)
      })
  }

  validateToConfirmed(prescription) {
    return new Promise((resolve, reject) => {
      states.CONFIRMED.validate(prescription)
      //TODO: Llamar al validador de reglas de negocio
      return resolve()
    })

  }

  toExpired(prescription) {

  }

  validateToExpired(prescription) {

  }
  toReceive(prescription) {
    if (prescription.items.every(item => item.received.quantity)) {
      return this.toReceived(prescription)
    }
    return this.toPartiallyReceived(prescription)
  }

  toReceived(prescription) {

  }

  validateToReceived(prescription) {

  }

  toPartiallyReceived(prescription) {

  }

  validateToPartiallyReceived(prescription) {

  }

  toIncomplete(prescription) {

  }

  validateToIncomplete(prescription) {

  }

  toAudited(prescription) {

  }

  validateToAudited(prescription) {

  }

  toRejected(prescription) {

  }

  validateToRejected(prescription) {

  }

  toPartiallyRejected(prescription) {

  }

  validateToPartiallyRejected(prescription) {

  }
}

module.exports = { StateMachine: new StateMachine() }
