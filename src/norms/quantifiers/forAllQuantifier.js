const { Quantifier } = require('./quantifier')

// Clase ForAll (Para Todo)
// Satisface cuando todos los predicados que tiene se satisfacen
// No requiere cantidad
class ForAllQuantifier extends Quantifier {
  // Valida que todos los predicados cumplan
  satisfies() {
    return this.predicates.every(predicate => predicate.satisfies())
  }

  getName() {
    return 'FOR_ALL'
  }
}

module.exports = { ForAllQuantifier }