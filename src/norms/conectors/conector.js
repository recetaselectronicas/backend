const { Predicate } = require('../predicates/predicate')

// Clase base para los conectores IS, NOT, OR, etc
// No hay logica que pueda compratirse ya que dependiendo del conector
// espera un predicado, un array de predicados o dos predicados (pre y pos)
class Conector extends Predicate { }

// Conector IS
// Satisface cuando el predicado que contiene satisface
// Es como la identidad matemática
class IsConector extends Conector {
  // El modelo que espera es solo un predicado
  doValidate(model) {
    if (!model.predicate || !(model.predicate instanceof Predicate)) {
      throw new Error('Error while assembling IsConector. No predicate given or not a Predicate')
    }
  }

  // Se guarda el predicado en la clase y se deja preparado
  doInitialize(model) {
    this.predicate = model.predicate
  }

  // Satisface cuando satisface el predicado
  satisfies() {
    return this.predicate.satisfies()
  }
}

// Conector NOT
// Satisface cuando el predicado que contiene no satisface
class NotConector extends Conector {
  // El modelo que espera es solo un predicado
  doValidate(model) {
    if (!model.predicate || !(model.predicate instanceof Predicate)) {
      throw new Error('Error while assembling IsConector')
    }
  }

  // Se guarda el predicado en la clase y se deja preparado
  doInitialize(model) {
    this.predicate = model.predicate
  }

  // Satisface cuando no satisface el predicadd
  satisfies() {
    return !this.predicate.satisfies()
  }
}

// Conector AND
// Satisface cuando todos los predicados que contienen satisfacen
class AndConector extends Conector {
  // El modelo que espera un array de predicados valido
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

  // Se guarda los predicados
  doInitialize(model) {
    this.predicates = model.predicates
  }

  // Satisface cuando satisfacen todos los predicados
  satisfies() {
    return this.predicates.every(predicate => predicate.satisfies())
  }
}

module.exports = {
  Conector,
  IsConector,
  NotConector,
  AndConector
}