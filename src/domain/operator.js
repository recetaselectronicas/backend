
// opciones de operadores
// igual
// distinto
// menor a
// mayor a
// existe
// no existe
// []


const operator = {
    EQUAL: {
        name: 'EQUAL',
        execute: (entity) => {
            return entity === operator.EQUAL.value
        },
        value: null
    },
    EXIST: {
        name: 'EXIST',
        execute: (entity) => {
            return entity !== null
        }
    },
    LESS: {
        name: 'LESS',
        execute: (entity) => {
            return entity.length < operator.LESS.value
        },
        value: null
    }

}
module.exports = { operator }