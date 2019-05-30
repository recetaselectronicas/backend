const checkNotNull = (value, field, errors) => {
    if (!value){
        errors.push(new Error(`Prescription must have a value at ${field}`)) 
    }
}
const checkNotEmpty = (value, field, errors) => {
    if (value instanceof Array){
        if (!value.length){
            errors.push(new Error(`Prescription must have at list one value at ${field}`))
        }
    } else if (value instanceof Object){
        if (!Object.keys(value).length){
            errors.push(new Error(`Prescription must have at list one attribute on ${field}`))
        }
    }
}
const getDiferentValueError = (value, otherValue, field) => {
    if (value !== otherValue){
        return (new Error(`Prescription ${field} must be ${otherValue}`))
    }
    return null
}
const getValueNotInListError = (value, otherValues, field) => {
    const found = otherValues.find((aValue) => {
        return aValue === value
    })
    if (!found){
        return (new Error(`Prescription ${field} must be one of this ${otherValues}`))
    }
    return null
}
const validator = function(prescription){
    const statusError = this.getStatusError(prescription)
    const errors = this.getErrors(prescription)
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
        return getDiferentValueError(prescription.status, null, 'status')
    },
    getErrors: (prescription) => {
        const errors = []
        checkNotNull(prescription.issuedDate, 'issuedDate', errors)
        checkNotNull(prescription.ttl, 'ttl', errors)
        checkNotNull(prescription.affiliate, 'affiliate', errors)
        checkNotNull(prescription.doctor, 'doctor', errors)
        checkNotNull(prescription.medicalInsurance, 'medicalInsurance', errors)
        checkNotNull(prescription.norm, 'norm', errors)
        checkNotEmpty(prescription.items, 'items', errors)
        return errors
    }
}
const CANCELLED = {
    status: 'CANCELADA',
    validate: validator,
    getStatusError: (prescription) => {
        return getDiferentValueError(prescription.status, ISSUED.status, 'status')
    },
    getErrors: (prescription) => {
        const errors = ISSUED.getErrors(prescription)
        return errors
    }
}
const CONFIRMED = {
    status: 'CONFIRMADA',
    validate: validator,
    getStatusError: (prescription) => {
        return getDiferentValueError(prescription.status, ISSUED.status, 'status')
    },
    getErrors: (prescription) => {
        const errors = ISSUED.getErrors(prescription)
        return errors
    }
}
const EXPIRED = {
    status: 'VENCIDA',
    validate: validator,
    getStatusError: (prescription) => {
        return getDiferentValueError(prescription.status, CONFIRMED.status, 'status')
    },
    getErrors: (prescription) => {
        const errors = CONFIRMED.getErrors(prescription)
        //TODO: Agregar validaciones para pasar a VENCIDA
        return errors
    }
}
const RECEIVED = {
    status: 'RECEPCIONADA',
    validate: validator,
    getStatusError: (prescription) => {
        return getValueNotInListError(prescription.status, [CONFIRMED.status, PARTIALLY_RECEIVED.status], 'status')
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
    }
}
const PARTIALLY_RECEIVED = {
    status: 'PARCIALMENTE_RECEPCIONADA',
    validate: validator,
    getStatusError: (prescription) => {
        return getDiferentValueError(prescription.status, CONFIRMED.status, 'status')
    },
    getErrors: (prescription) => {
        const errors = CONFIRMED.getErrors(prescription)
        //TODO: Agregar validaciones para pasar a PARCIALMENTE_RECEPCIONADAS
        return errors
    }
}
const INCOMPLETE = {
    status: 'INCOMPLETA',
    validate, validator,
    getStatusError: (prescription) => {
        return getDiferentValueError(prescription.status, PARTIALLY_RECEIVED.status, 'status')
    },
    getErrors: (prescription) => {
        const errors = PARTIALLY_RECEIVED.getErrors(prescription)
        //TODO: Agregar validaciones para pasar a INCOMPLETA
        return errors
    }
}
const AUDITED = {
    status: 'AUDITADA',
    validate, validator,
    getStatusError: (prescription) => {
        return getValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], 'status')
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
    }
}
const REJECTED = {
    status: 'RECHAZADA',
    validate, validator,
    getStatusError: (prescription) => {
        return getValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], 'status')
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
    }
}
const PARTIALLY_REJECTED = {
    status: 'PARCIALMENTE_RECHAZADA',
    validate, validator,
    getStatusError: (prescription) => {
        return getValueNotInListError(prescription.status, [INCOMPLETE.status, RECEIVED.status], 'status')
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