const { Predicate } = require('../predicates/predicate')
const { Executable } = require('../executables/executable')


// Clase que representa una regla propiamente dicha
// Tiene una descripcion con la que se muestra y un
// mensaje de error que devuelve cuando no se cumple
// la regla
class Rule extends Executable {
  doValidate(model) {
    if (!model.description) {
      throw new Error('Error while assembling Rule. No description given.')
    }
    if (!model.errorMessage) {
      throw new Error('Error while assembling Rule. No errorMessage given.')
    }
    if (!model.predicate || !(model.predicate instanceof Predicate)) {
      throw new Error('Error while assembling Rule. No predicate given or not a Predicate.')
    }
  }

  doInitialize(model) {
    this.description = model.description
    this.errorMessage = model.errorMessage
    this.predicate = model.predicate
  }

  satisfies() {
    return this.predicate.satisfies()
  }

  getError() {
    return this.errorMessage
  }

  toJson() {
    return {
      ...super.toJson(),
      description: this.description,
      errorMessage: this.errorMessage,
      predicate: this.predicate.toJson()
    }
  }

  getName() {
    return 'RULE'
  }
}

module.exports = { Rule }