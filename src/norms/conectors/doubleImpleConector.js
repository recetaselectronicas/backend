/* eslint-disable no-mixed-operators */
const { Predicate } = require('../predicates/predicate')
const { Conector } = require('./conector')

// Conector DOUBLE_IMPL
// Satisface cuando el antecedente y consecuente no satisfacen
// o cuando el antecedente y consecuente satisfacen
class DoubleImplConector extends Conector {
  doValidate(model) {
    if (!model.antecedent || !(model.antecedent instanceof Predicate)) {
      throw new Error('Error while assembling DoubleImplConector. No antecedent given or not a Predicate.')
    }
    if (!model.consequent || !(model.consequent instanceof Predicate)) {
      throw new Error('Error while assembling DoubleImplConector. No consequent given or not a Predicate.')
    }
  }

  doInitialize(model) {
    this.antecedent = model.antecedent
    this.consequent = model.consequent
  }

  satisfies() {
    return !this.antecedent.satisfies() && !this.consequent.satisfies() || this.antecedent.satisfies() && this.consequent.satisfies()
  }

  getName() {
    return 'DOUBLE_IMPL'
  }

  getModelToJson() {
    return {
      antecedent: this.antecedent.toJson(),
      consequent: this.consequent.toJson()
    }
  }
}

module.exports = { DoubleImplConector }