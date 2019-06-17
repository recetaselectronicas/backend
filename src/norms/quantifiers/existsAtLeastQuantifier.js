const { ExistsQuantifier } = require('./existsQuantifier')

// Clase Exists At Least (Existe por lo menos)
// Satisface si por lo menos cierta cantidad de predicados se satisficieron
// la cantidad es la ingresada en el modelo
class ExistsAtLeastQuantifier extends ExistsQuantifier {
  satisfies() {
    let failsQuantity = 0
    for (let i = 0; i < this.predicates.length; i++) {
      if (!this.predicates[i].satisfies()) {
        failsQuantity++
      }
      if (this.quantity > this.predicates.length - failsQuantity) {
        return false
      }
    }
    return true
  }

  getName() {
    return 'EXISTS_AT_LEAST'
  }
}

module.exports = { ExistsAtLeastQuantifier }