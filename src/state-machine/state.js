const {newNullOrEmptyError, newInvalidValueError, generateFieldCause} = require('../utils/errors')
const {checkArrayNotEmpty, checkNotNull, checkDiferentValueError, checkValueNotInListError} = require('../utils/errors')
const {codes} = require('../codes/entities-codes')

const validator = function(prescription){
    if (!prescription){
        throw [newNullOrEmptyError('prescription cant be null or empty', generateFieldCause(codes.PRESCRIPTION.name, null))]
    }
    const statusError = this.getStatusError(prescription)
    const errors = this.getErrors(prescription).concat(this.getSpecificErrors(prescription))
    if (statusError){
        errors.push(statusError)
    }
    if (errors.length){
        throw errors
    }
}
const ISSUED = {
    status: 'EMITIDA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkDiferentValueError(prescription.status, null, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        const errors = []
        checkNotNull(prescription.issuedDate, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.issuedDate, errors)
        checkNotNull(prescription.ttl, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.ttl, errors)
        checkNotNull(prescription.affiliate, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.affiliate, errors)
        checkNotNull(prescription.doctor, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.doctor, errors)
        checkNotNull(prescription.medicalInsurance, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.medicalInsurance, errors)
        checkNotNull(prescription.norm, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.norm, errors)
        checkArrayNotEmpty(prescription.items, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.items, errors)
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        checkDiferentValueError(prescription.soldDate, null, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.soldDate, errors)
        checkDiferentValueError(prescription.auditedDate, null, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.auditedDate, errors)
        return errors
    }
}
const CANCELLED = {
    status: 'CANCELADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkDiferentValueError(prescription.status, ISSUED.status, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        const errors = ISSUED.getErrors(prescription)
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const CONFIRMED = {
    status: 'CONFIRMADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkDiferentValueError(prescription.status, ISSUED.status, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        const errors = ISSUED.getErrors(prescription)
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const EXPIRED = {
    status: 'VENCIDA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkDiferentValueError(prescription.status, CONFIRMED.status, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        const errors = CONFIRMED.getErrors(prescription)
        //TODO: Agregar validaciones para pasar a VENCIDA
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const RECEIVED = {
    status: 'RECEPCIONADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkValueNotInListError(prescription.status, [CONFIRMED.status, PARTIALLY_RECEIVED.status], codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        let errors = []
        if (prescription.status === CONFIRMED.status){
            errors = CONFIRMED.getErrors(prescription)
        }
        if (prescription.status === PARTIALLY_RECEIVED.status){
            errors = PARTIALLY_RECEIVED.getErrors(prescription)
        }
        //TODO: Agregar validaciones para pasar a RECEPCIONADA
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const PARTIALLY_RECEIVED = {
    status: 'PARCIALMENTE_RECEPCIONADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkDiferentValueError(prescription.status, CONFIRMED.status, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        const errors = CONFIRMED.getErrors(prescription)
        //TODO: Agregar validaciones para pasar a PARCIALMENTE_RECEPCIONADAS
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const INCOMPLETE = {
    status: 'INCOMPLETA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkDiferentValueError(prescription.status, PARTIALLY_RECEIVED.status, codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        const errors = PARTIALLY_RECEIVED.getErrors(prescription)
        //TODO: Agregar validaciones para pasar a INCOMPLETA
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const AUDITED = {
    status: 'AUDITADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        let errors = []
        if (prescription.status === INCOMPLETE.status){
            errors = INCOMPLETE.getErrors(prescription)
        }
        if (prescription.status === RECEIVED.status){
            errors = RECEIVED.getErrors(prescription)
        }
        //TODO: Agregar validaciones para pasar a INCOMPLETA
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const REJECTED = {
    status: 'RECHAZADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        let errors = []
        if (prescription.status === INCOMPLETE.status){
            errors = INCOMPLETE.getErrors(prescription)
        }
        if (prescription.status === RECEIVED.status){
            errors = RECEIVED.getErrors(prescription)
        }
        //TODO: Agregar validaciones para pasar a RECHAZADA
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const PARTIALLY_REJECTED = {
    status: 'PARCIALMENTE_RECHAZADA',
    validate: validator,
    getStatusError: (prescription) => {
        return checkValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], codes.PRESCRIPTION.name, codes.PRESCRIPTION.fields.status)
    },
    getErrors: (prescription) => {
        let errors = []
        if (prescription.status === INCOMPLETE.status){
            errors = INCOMPLETE.getErrors(prescription)
        }
        if (prescription.status === RECEIVED.status){
            errors = RECEIVED.getErrors(prescription)
        }
        //TODO: Agregar validaciones para pasar a PARCIALMENTE_RECHAZADA
        return errors
    },
    getSpecificErrors: (prescription) => {
        const errors = []
        return errors
    }
}
const states = {
    ISSUED,
    CANCELLED,
    CONFIRMED,
    EXPIRED,
    RECEIVED,
    PARTIALLY_RECEIVED,
    INCOMPLETE,
    AUDITED,
    REJECTED,
    PARTIALLY_REJECTED
}

module.exports = {states}