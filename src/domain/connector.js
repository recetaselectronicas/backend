//se podria poner como algo general de estas entidades y diferenciarlaporclases

class Connector {
    //or
    constructor() {
        this.id = null
        this.type = null
        this.name = 'OR'
        this.conditions = []
    }
    cumple(prescription) {
        return this.conditions.some(condition => condition.cumple(prescription))
    }
}
module.exports = { Connector }