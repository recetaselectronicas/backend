const { ExistsQuantifier } = require('./existsQuantifier')

// Clase Exists At Most (Existe como mucho)
// Satisface si cierta cantidad de predicados se satisficieron
// igual o menos de una cantidad de veces
class ExistsAtMostQuantifier extends ExistsQuantifier {
  satisfies() {
    let satisfiesQuantity = 0
    for (let i = 0; i < this.predicates.length; i++) {
      if (this.predicates[i].satisfies()) {
        satisfiesQuantity++
      }
    }
    return satisfiesQuantity <= this.quantity
  }

  getName() {
    return 'EXISTS_AT_MOST'
  }
}

module.exports = { ExistsAtMostQuantifier }