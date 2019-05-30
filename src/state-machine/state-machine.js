const {states} = require('./state')
const {PrescriptionRepository} = require('../repositories/prescriptions-repository')

class StateMachine {
    constructor(){

    }

    toIssued(prescription){
        return this.validateToIssued(prescription)
        .then(_ => {
            return PrescriptionRepository.update(prescription)
        })
    }

    validateToIssued(prescription){
        return new Promise((resolve, reject) => {
            PrescriptionRepository.getById(prescription.id)
            .then(_ => {
                states.ISSUED.validate(prescription)
                //TODO: Llamar al validador de reglas de negocio
                return resolve()
            })
            .catch(err => {
                return reject(err)
            })
        })
    }

    toCancelled(prescription){

    }

    validateToCancelled(prescription){

    }

    toConfirmed(prescription){

    }

    validateToConfirmed(prescription){

    }

    toExpired(prescription){

    }

    validateToExpired(prescription){

    }

    toReceived(prescription){

    }

    validateToReceived(prescription){

    }

    toPartiallyReceived(prescription){

    }

    validateToPartiallyReceived(prescription){

    }
    
    toIncomplete(prescription){

    }

    validateToIncomplete(prescription){

    }

    toAudited(prescription){

    }

    validateToAudited(prescription){

    }

    toRejected(prescription){

    }

    validateToRejected(prescription){

    }

    toPartiallyRejected(prescription){

    }

    validateToPartiallyRejected(prescription){
        
    }
}

module.exports = {StateMachine = new StateMachine()}