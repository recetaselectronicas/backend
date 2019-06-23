const { states } = require('./state')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { NormRepository } = require('../repositories/normRepository')
const moment = require('moment')

class StateMachine {
  constructor() { }

  toIssued(prescription) {
    prescription.setIssuedDate(moment())
    prescription.ttl = NormRepository.getCurrentTTL(prescription.medicalInsurance.id)
    prescription.norm = NormRepository.getCurrentNormId(prescription.medicalInsurance.id)

    return this.validateToIssued(prescription).then(() => {
      prescription.status = states.ISSUED.id
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
    return this.validateToCancelled(prescription).then(() => PrescriptionRepository.updateTo(prescription, states.CANCELLED.id))
  }

  validateToCancelled(prescription) {
    return new Promise((resolve, reject) => {
      states.CANCELLED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toConfirmed(prescription) {
    return this.validateToConfirmed(prescription).then(() => {
      prescription.status = states.CONFIRMED.id
      return PrescriptionRepository.update(prescription)
    })
  }

  validateToConfirmed(prescription) {
    return new Promise((resolve, reject) => {
      states.CONFIRMED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toExpired(prescription) { }

  validateToExpired(prescription) { }

  toReceive(prescription) {
    prescription.setSoldDate(moment())
    if (prescription.items.every(item => item.received.quantity !== null)) {
      return this.toReceived(prescription)
    }
    return this.toPartiallyReceived(prescription)
  }

  toReceived(prescription) {
    return this.validateToReceived(prescription).then(() => {
      prescription.status = states.RECEIVED.id
      return PrescriptionRepository.update(prescription)
    })
  }

  validateToReceived(prescription) {
    return new Promise((resolve, reject) => {
      states.RECEIVED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toPartiallyReceived(prescription) {
    return this.validateToPartiallyReceived(prescription).then(() => {
      prescription.status = states.PARTIALLY_RECEIVED.id
      return PrescriptionRepository.update(prescription)
    })
  }

  validateToPartiallyReceived(prescription) {
    return new Promise((resolve, reject) => {
      states.PARTIALLY_RECEIVED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toAudit(prescription) {
    prescription.setAuditedDate(moment())
    const itemsReceived = prescription.items.filter(item => !!item.received.quantity)
    if (itemsReceived.every(item => item.audited.quantity === item.received.quantity && item.audited.medicine.id === item.received.medicine.id)) {
      return this.toAudited(prescription)
    }
    if (itemsReceived.every(item => item.received.quantity !== item.audited.quantity || item.received.medicine.id !== item.audited.medicine.id)) {
      return this.toRejected(prescription)
    }
    return this.toPartiallyRejected(prescription)
  }

  toIncomplete(prescription) { }

  validateToIncomplete(prescription) { }

  toAudited(prescription) {
    return this.validateToAudited(prescription)
      .then(() => {
        prescription.status = states.AUDITED.id
        return PrescriptionRepository.update(prescription)
      })
  }

  validateToAudited(prescription) {
    return new Promise((resolve, reject) => {
      states.AUDITED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toRejected(prescription) {
    return this.validateToRejected(prescription)
      .then(() => {
        prescription.status = states.REJECTED.id
        return PrescriptionRepository.update(prescription)
      })
  }

  validateToRejected(prescription) {
    return new Promise((resolve, reject) => {
      states.REJECTED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }

  toPartiallyRejected(prescription) {
    return this.validateToPartiallyRejected(prescription)
      .then(() => {
        prescription.status = states.PARTIALLY_REJECTED.id
        return PrescriptionRepository.update(prescription)
      })
  }

  validateToPartiallyRejected(prescription) {
    return new Promise((resolve, reject) => {
      states.PARTIALLY_REJECTED.validate(prescription)
      // TODO: Llamar al validador de reglas de negocio
      return resolve()
    })
  }
}

module.exports = { StateMachine: new StateMachine() }
