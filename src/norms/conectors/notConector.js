const { Predicate } = require('../predicates/predicate')
const { Conector } = require('./conector')

// Conector NOT
// Satisface cuando el predicado que contiene no satisface
class NotConector extends Conector {
  doValidate(model) {
    if (!model.predicate || !(model.predicate instanceof Predicate)) {
      throw new Error('Error while assembling IsConector')
    }
  }

  doInitialize(model) {
    this.predicate = model.predicate
  }

  satisfies() {
    return !this.predicate.satisfies()
  }

  getName() {
    return 'NOT'
  }

  getModelToJson() {
    return {
      predicate: this.predicate.toJson()
    }
  }
}

module.exports = { NotConector }