const { Predicate } = require('../predicates/predicate')
const { Conector } = require('./conector')

// Conector IS
// Satisface cuando el predicado que contiene satisface
// Es como la identidad matemática
class IsConector extends Conector {
  doValidate(model) {
    if (!model.predicate || !(model.predicate instanceof Predicate)) {
      throw new Error('Error while assembling IsConector. No predicate given or not a Predicate')
    }
  }

  doInitialize(model) {
    this.predicate = model.predicate
  }

  satisfies() {
    return this.predicate.satisfies()
  }

  getName() {
    return 'IS'
  }

  getModelToJson() {
    return {
      predicate: this.predicate.toJson()
    }
  }
}

module.exports = { IsConector }