const { Predicate } = require('../predicates/predicate')
const { Conector } = require('./conector')

// Conector IMPL
// Satisface cuando el antecedente no satisface o si el
// concecuente satisface
class ImplConector extends Conector {
  doValidate(model) {
    if (!model.antecedent || !(model.antecedent instanceof Predicate)) {
      throw new Error('Error while assembling ImplConector. No antecedent given or not a Predicate.')
    }
    if (!model.consequent || !(model.consequent instanceof Predicate)) {
      throw new Error('Error while assembling ImplConector. No consequent given or not a Predicate.')
    }
  }

  doInitialize(model) {
    this.antecedent = model.antecedent
    this.consequent = model.consequent
  }

  satisfies() {
    return !this.antecedent.satisfies() || this.consequent.satisfies()
  }

  getName() {
    return 'IMPL'
  }

  getModelToJson() {
    return {
      antecedent: this.antecedent.toJson(),
      consequent: this.consequent.toJson()
    }
  }
}

module.exports = { ImplConector }