const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { StateMachine } = require('../state-machine/state-machine')
const { config } = require('../config/config')
const { defaults } = require('../config/defaults')

const issuedDaemon = defaults.daemons.issued.name
const expiredDaemon = defaults.daemons.expired.name

const checkIssued = () => PrescriptionRepository.getIssuedToConfirmed()
  .then(values => values.map(value => PrescriptionRepository.getById(value.id).then(prescription => StateMachine.toConfirmed(prescription))))
  .then(updates => updates && updates.length && logger.info(`${issuedDaemon}: confirmed ${updates.length} prescriptions`))
  .catch(e => logger.error(`${issuedDaemon}: error while confirming prescriptions`, e))

const checkExpired = () => PrescriptionRepository.getPrescriptionsToExpirate()
  .then(values => values.map(value => PrescriptionRepository.getById(value.id).then(prescription => StateMachine.toExpire(prescription))))
  .then(updates => updates && updates.length && logger.info(`${expiredDaemon}: expired ${updates.length} prescriptions`))
  .catch(e => logger.error(`${expiredDaemon}: error while expiring prescriptions`, e))

const init = () => {
  if (config.executeDaemon.issued) {
    setInterval(() => checkIssued(), defaults.daemons.issued.interval)
    logger.info(`${issuedDaemon}: running`)
  } else {
    logger.warn(`${issuedDaemon}: disabled. To enable please go to config and set executeDaemon.issued to true`)
  }
  if (config.executeDaemon.expired) {
    setInterval(() => checkExpired(), defaults.daemons.expired.interval)
    logger.info(`${expiredDaemon}: running`)
  } else {
    logger.warn(`${expiredDaemon}: disabled. To enable please go to config and set executeDaemon.expired to true`)
  }
}

module.exports = { init }