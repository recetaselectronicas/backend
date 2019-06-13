class Rule {
    constructor() {
        this.id = null
        this.description = null
        this.error = 'hola hola puchi puchi'
        this.condition = null
    }

    setCondition(condition) {
        this.condition = condition
    }
    satisfies(prescription) {
        return this.condition.cumple(prescription)
    }

}

module.exports = { Rule }