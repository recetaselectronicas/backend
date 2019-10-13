/* eslint-disable no-param-reassign */
const moment = require('moment')
const { states } = require('./state')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { NormRepository } = require('../repositories/normRepository')
const { validateRulesOnPrescription } = require('../norms/norm')

class StateMachine {
  async validateNorm(prescription, status) {
    validateRulesOnPrescription(prescription, status, await NormRepository.getCurrentNormByMedicalInsuranceId(prescription.medicalInsurance.id))
  }

  async toIssued(prescription, createPrescription = true) {
    prescription.setIssuedDate(moment())
    prescription.ttl = await NormRepository.getCurrentTTL(prescription.medicalInsurance.id)
    prescription.norm = await NormRepository.getCurrentNormId(prescription.medicalInsurance.id)

    return this.validateToIssued(prescription).then(() => {
      prescription.status = states.ISSUED.id
      if (createPrescription) {
        return PrescriptionRepository.create(prescription)
      }
      return null
    })
  }

  async validateToIssued(prescription) {
    states.ISSUED.validate(prescription)
    await this.validateNorm(prescription, states.ISSUED.id)
  }

  toCancelled(prescription, updatePrescription = true) {
    return this.validateToCancelled(prescription).then(() => {
      prescription.status = states.CANCELLED.id
      if (updatePrescription) {
        return PrescriptionRepository.update(prescription)
      }
      return prescription
    })
  }

  async validateToCancelled(prescription) {
    states.CANCELLED.validate(prescription)
    await this.validateNorm(prescription, states.CANCELLED.id)
  }

  toConfirmed(prescription) {
    return this.validateToConfirmed(prescription).then(() => {
      prescription.status = states.CONFIRMED.id
      return PrescriptionRepository.update(prescription)
    })
  }

  async validateToConfirmed(prescription) {
    states.CONFIRMED.validate(prescription)
    await this.validateNorm(prescription, states.CONFIRMED.id)
  }


  toExpire(prescription) {
    if (prescription.status === states.PARTIALLY_RECEIVED.id) {
      return this.toIncomplete(prescription)
    }
    return this.toExpired(prescription)
  }

  toExpired(prescription) {
    return this.validateToExpired(prescription).then(() => {
      prescription.status = states.EXPIRED.id
      return PrescriptionRepository.update(prescription)
    })
  }

  async validateToExpired(prescription) {
    states.EXPIRED.validate(prescription)
    await this.validateNorm(prescription, states.EXPIRED.id)
  }

  toIncomplete(prescription) {
    return this.validateToIncomplete(prescription).then(() => {
      prescription.status = states.INCOMPLETE.id
      return PrescriptionRepository.update(prescription)
    })
  }

  async validateToIncomplete(prescription) {
    states.INCOMPLETE.validate(prescription)
    await this.validateNorm(prescription, states.INCOMPLETE.id)
  }

  toReceive(prescription, updatePrescription = true) {
    prescription.setSoldDate(moment())
    if (prescription.items.every(item => item.received.quantity !== null)) {
      return this.toReceived(prescription, updatePrescription)
    }
    return this.toPartiallyReceived(prescription, updatePrescription)
  }

  toReceived(prescription, updatePrescription = true) {
    return this.validateToReceived(prescription).then(() => {
      prescription.status = states.RECEIVED.id
      if (updatePrescription) {
        return PrescriptionRepository.update(prescription)
      }
      return prescription
    })
  }

  async validateToReceived(prescription) {
    states.RECEIVED.validate(prescription)
    await this.validateNorm(prescription, states.RECEIVED.id)
  }

  toPartiallyReceived(prescription, updatePrescription = true) {
    return this.validateToPartiallyReceived(prescription).then(() => {
      prescription.status = states.PARTIALLY_RECEIVED.id
      if (updatePrescription) {
        return PrescriptionRepository.update(prescription)
      }
      return prescription
    })
  }

  async validateToPartiallyReceived(prescription) {
    states.PARTIALLY_RECEIVED.validate(prescription)
    await this.validateNorm(prescription, states.PARTIALLY_RECEIVED.id)
  }

  toAudit(prescription, updatePrescription = true) {
    prescription.setAuditedDate(moment())
    const itemsReceived = prescription.items.filter(item => !!item.received.quantity)
    if (itemsReceived.every(item => item.audited.quantity === item.received.quantity && item.audited.medicine.id === item.received.medicine.id)) {
      return this.toAudited(prescription, updatePrescription)
    }
    if (itemsReceived.every(item => item.received.quantity !== item.audited.quantity || item.received.medicine.id !== item.audited.medicine.id)) {
      return this.toRejected(prescription, updatePrescription)
    }
    return this.toPartiallyRejected(prescription, updatePrescription)
  }

  toAudited(prescription, updatePrescription = true) {
    return this.validateToAudited(prescription)
      .then(() => {
        prescription.status = states.AUDITED.id
        if (updatePrescription) {
          return PrescriptionRepository.update(prescription)
        }
        return prescription
      })
  }

  async validateToAudited(prescription) {
    states.AUDITED.validate(prescription)
    await this.validateNorm(prescription, states.AUDITED.id)
  }

  toRejected(prescription, updatePrescription = true) {
    return this.validateToRejected(prescription)
      .then(() => {
        prescription.status = states.REJECTED.id
        if (updatePrescription) {
          return PrescriptionRepository.update(prescription)
        }
        return prescription
      })
  }

  async validateToRejected(prescription) {
    states.REJECTED.validate(prescription)
    await this.validateNorm(prescription, states.REJECTED.id)
  }

  toPartiallyRejected(prescription, updatePrescription = true) {
    return this.validateToPartiallyRejected(prescription)
      .then(() => {
        prescription.status = states.PARTIALLY_REJECTED.id
        if (updatePrescription) {
          return PrescriptionRepository.update(prescription)
        }
        return prescription
      })
  }

  async validateToPartiallyRejected(prescription) {
    states.PARTIALLY_REJECTED.validate(prescription)
    await this.validateNorm(prescription, states.PARTIALLY_REJECTED.id)
  }
}

module.exports = { StateMachine: new StateMachine() }
