
const operator = {
    EQUAL: {
        name: 'EQUAL',
        execute: (entity, value) => {
            return entity === value
        }
    },
    EXIST: {
        name: 'EXIST',
        execute: (entity,value) => {
            return entity !== null
        }
    },
    LESS: {
        name: 'LESS',
        execute: (entity,value) => {
            return entity.length < value
        }
    }

}
module.exports = { operator }