const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const permissions = require('../permissions/identifiedUser')
const errors = require('../utils/errors')
const { StateMachine } = require('../state-machine/state-machine')
const { waitAll } = require('../utils/utils')

const checkIssued = () => {
  const updates = {
    okQuantity: 0,
    errorQuantity: 0
  }
  return PrescriptionRepository.getIssuedToConfirmed()
    .then((ids) => {
      if (ids) {
        return Promise.all(waitAll(ids.map(value => PrescriptionRepository.getById(value.id)
          .then(prescription => StateMachine.toConfirmed(prescription)))))
          .then(results => ({
            ...updates,
            okQuantity: results.filter(result => result.result === 'ok').length,
            errorQuantity: results.filter(result => result.result === 'error').length
          }))
      }
      return Promise.resolve(updates)
    })
    .catch((err) => {
      logger.error(err)
    })
}

const checkExpired = () => {
  logger.info('Se chequearon las recetas vencidas')
  return PrescriptionRepository.getPrescriptionsToExpirate()
    .then((ids) => {
      if (ids) {
        ids.forEach(value => PrescriptionRepository.getById(value.id)
          .then(prescription => StateMachine.toExpire(prescription)))
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

const init = () => {
  logger.info('Confirmation Daemon its running')
  setInterval(() => {
    checkIssued()
      .then((result) => {
        if (result.okQuantity) {
          logger.info(`Confirmation Daemon updated ${result.okQuantity} prescriptions`)
        } else {
          logger.info('No prescriptions where updated by Confirmation Daemon')
        }
        if (result.errorQuantity) {
          logger.error(`But ${result.errorQuantity} updates failed. Please take a look at this.`)
        }
      })
  }, 30000)
  setInterval(() => { checkExpired() }, 30000)
}

module.exports = { init }