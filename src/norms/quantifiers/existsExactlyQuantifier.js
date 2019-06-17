const { ExistsQuantifier } = require('./existsQuantifier')

// Clase Exists Exactly (Existe exactamente)
// Satisface si cierta cantidad de predicados se satisficieron
class ExistsExactlyQuantifier extends ExistsQuantifier {
  satisfies() {
    let satisfiesQuantity = 0
    for (let i = 0; i < this.predicates.length; i++) {
      if (this.predicates[i].satisfies()) {
        satisfiesQuantity++
      }
    }
    return satisfiesQuantity === this.quantity
  }

  getName() {
    return 'EXISTS_EXACTLY'
  }
}

module.exports = { ExistsExactlyQuantifier }