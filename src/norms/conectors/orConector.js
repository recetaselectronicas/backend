const { Predicate } = require('../predicates/predicate')
const { Conector } = require('./conector')

// Conector OR
// Satisface cuando alguno de los predicados que contienen satisface
class OrConector extends Conector {
  doValidate(model) {
    if (!model.predicates || !(model.predicates instanceof Array)) {
      throw new Error('Error while assembling OrConector. No predicates given or not an Array.')
    }
    if (!model.predicates.length) {
      throw new Error('Error while assembling OrConector. No predicate given on predicates array')
    }
    if (!model.predicates.every(predicate => predicate instanceof Predicate)) {
      throw new Error('Error while assembling OrConector. Not all predicates are Predicate')
    }
  }

  doInitialize(model) {
    this.predicates = model.predicates
  }

  satisfies() {
    return this.predicates.some(predicate => predicate.satisfies())
  }

  getName() {
    return 'OR'
  }

  getModelToJson() {
    return {
      predicates: this.predicates.map(predicate => predicate.toJson())
    }
  }
}

module.exports = { OrConector }