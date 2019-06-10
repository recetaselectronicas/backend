class Rule {
    constructor() {
        this.id = null
        this.description = null
        this.error = 'hola hola puchi puchi'
        this.shouldSatisfy = null
    }

    setThatSatisfy(entity) {
        this.shouldSatisfy = entity
    }
    satisfy(prescription) {
        return this.shouldSatisfy.cumple(prescription)
    }

}

module.exports = { Rule }