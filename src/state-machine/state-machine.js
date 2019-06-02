const {states} = require('./state')
const {PrescriptionRepository} = require('../repositories/prescriptions-repository')
const moment = require('moment')

class StateMachine {
    constructor(){

    }

    toIssued(prescription){
        prescription.setIssuedDate(moment())
        prescription.ttl = 30 //TODO: reemplazar con el llamado a tiempo de vida posta segun OS
        prescription.norm = 1 //TODO: reemplazar con el llamado a norma vigente segun OS
        return this.validateToIssued(prescription)
        .then(() => {
            prescription.status = states.ISSUED.status
            return PrescriptionRepository.create(prescription)
        })
    }

    validateToIssued(prescription){
        return new Promise((resolve, reject) => {
            states.ISSUED.validate(prescription)
            //TODO: Llamar al validador de reglas de negocio
            return resolve()
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

module.exports = {StateMachine: new StateMachine()}