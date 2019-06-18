const { Predicate } = require('../predicates/predicate')

// Clase base para los cuantificadores EXISTS, FORALL, etc.
// Solo utiles con los items
class Quantifier extends Predicate {
  doValidate(model) {
    if (!model.predicates || !(model.predicates instanceof Array)) {
      throw new Error('Error while assembling Quantifier. No predicates given or not an Array.')
    }
  }

  doInitialize(model) {
    this.predicates = model.predicates
  }

  toJson() {
    return {
      quantifier: this.getName()
    }
  }

  getName() {
    throw new Error('Template method. Please override!')
  }

  getModelToJson() {
    throw new Error('Template method. Please override!')
  }
}

module.exports = { Quantifier }