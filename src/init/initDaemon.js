const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { StateMachine } = require('../state-machine/state-machine')
const { config } = require('../config/config')

const checkIssued = () => {
  logger.info('Se cambiaron a confirmadas las recetas emitidas ')
  return PrescriptionRepository.getIssuedToConfirmed()
    .then((ids) => {
      if (ids) {
        ids.forEach(value => PrescriptionRepository.getById(value.id)
          .then(prescription => StateMachine.toConfirmed(prescription)))
      }
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
      logger.error(err)
    })
}
const init = () => {
  if (config.executeDaemon.issued) {
    setInterval(() => checkIssued(), 30000)
    logger.info('Issued Daemon is running')
  } else {
    logger.warn('Issued Daemon is disabled. To enable please go to config and set executeDaemon.issued to true')
  }
  if (config.executeDaemon.expired) {
    setInterval(() => checkExpired(), 30000)
    logger.info('Expired Daemon is running')
  } else {
    logger.warn('Expired Daemon is disabled. To enable please go to config and set executeDaemon.expired to true')
  }
}

module.exports = { init }