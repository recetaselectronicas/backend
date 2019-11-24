const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { StateMachine } = require('../state-machine/state-machine')
const { config } = require('../config/config')
const { defaults } = require('../config/defaults')

const issuedDaemon = defaults.daemons.issued.name
const expiredDaemon = defaults.daemons.expired.name

const checkIssued = () => PrescriptionRepository.getIssuedToConfirmed()
  .then(values => values.map(value => PrescriptionRepository.getById(value.id)
    .then(prescription => StateMachine.toConfirmed(prescription))
    .then(res => ({ resultOk: true, res }))
    .catch(err => ({ resultOk: false, err }))))
  .then(results => Promise.all(results))
  .then((results) => {
    const errorResults = results.filter(result => !result.resultOk)
    if (errorResults.length) {
      logger.error(`${issuedDaemon}: error while confirming prescriptions. ${results.length - errorResults.length} updated OK. ${errorResults.length} updating ERROR`)
      errorResults.forEach((errorResult, index) => {
        logger.error(`${issuedDaemon}: errors[${index}] ${JSON.stringify(errorResult.err)}`)
      })
    } else if (results.length) {
      logger.info(`${issuedDaemon}: confirmed ${results.length} prescriptions`)
    }
  })

const checkExpired = () => PrescriptionRepository.getPrescriptionsToExpirate()
  .then(values => values.map(value => PrescriptionRepository.getById(value.id)
    .then(prescription => StateMachine.toExpire(prescription))
    .then(res => ({ resultOk: true, res }))
    .catch(err => ({ resultOk: false, err }))))
  .then(results => Promise.all(results))
  .then((results) => {
    const errorResults = results.filter(result => !result.resultOk)
    if (errorResults.length) {
      logger.error(`${issuedDaemon}: error while expiring prescriptions. ${results.length - errorResults.length} updated OK. ${errorResults.length} updating ERROR`)
      errorResults.forEach((errorResult, index) => {
        logger.error(`${issuedDaemon}: errors[${index}] ${JSON.stringify(errorResult.err)}`)
      })
    } else if (results.length) {
      logger.info(`${expiredDaemon}: expired ${results.length} prescriptions`)
    }
  })

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