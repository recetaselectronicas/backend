const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const permissions = require('../permissions/identifiedUser')
const errors = require('../utils/errors')

const init = () => {
    logger.info(`Daemon its running `)
    setInterval(function () { checkIssued() }, 1000);
}

const checkIssued = () => {
    logger.info(`Se cambiaron a confirmadas las recetas emitidas `)
    return PrescriptionRepository.getIssuedToConfirmed()
    .then((prescriptions) => {
      // identifiedUser.checkForbiden(prescription)
    console.log(prescriptions)  
    })
}
module.exports = { init }