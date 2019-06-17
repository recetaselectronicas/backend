const { Predicate } = require('../predicates/predicate')
const { Conector } = require('./conector')

// Conector AND
// Satisface cuando todos los predicados que contienen satisfacen
class AndConector extends Conector {
  doValidate(model) {
    if (!model.predicates || !(model.predicates instanceof Array)) {
      throw new Error('Error while assembling AndConector. No predicates given or not an Array.')
    }
    if (!model.predicates.length) {
      throw new Error('Error while assembling AndConector. No predicate given on predicates array')
    }
    if (!model.predicates.every(predicate => predicate instanceof Predicate)) {
      throw new Error('Error while assembling AndConector. Not all predicates are Predicate')
    }
  }

  doInitialize(model) {
    this.predicates = model.predicates
  }

  satisfies() {
    return this.predicates.every(predicate => predicate.satisfies())
  }

  getName() {
    return 'AND'
  }

  getModelToJson() {
    return {
      predicates: this.predicates.map(predicate => predicate.toJson())
    }
  }
}

module.exports = { AndConector }