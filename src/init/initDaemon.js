const { logger } = require('../utils/utils')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const permissions = require('../permissions/identifiedUser')
const errors = require('../utils/errors')
const { StateMachine } = require('../state-machine/state-machine')

const init = () => {
  logger.info(`Daemon its running `)
  setInterval(function () { checkIssued() }, 1000);
}

const checkIssued = () => {
  logger.info(`Se cambiaron a confirmadas las recetas emitidas `)
  return PrescriptionRepository.getIssuedToConfirmed()
    .then((ids) => {
      const prescriptions = []
      console.log(ids)
      ids.forEach(id => {
        console.log(id.id)
        return PrescriptionRepository.getById(id.id)
          .then((prescription) => {
             return StateMachine.toConfirmed(prescription)
          }
          )
      }
      )
      return prescriptions
    })
    .catch((err) => {
     console.log(err)
      
    })
}

module.exports = { init }