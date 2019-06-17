const { Predicate } = require('../predicates/predicate')

// Clase base para los conectores IS, NOT, OR, etc
// No hay logica que pueda compratirse ya que dependiendo del conector
// espera un predicado, un array de predicados o dos predicados (pre y pos)
class Conector extends Predicate {
  toJson() {
    return {
      type: 'CONECTOR',
      name: this.getName(),
      ...this.getModelToJson()
    }
  }

  getName() {
    throw new Error('Template method. Please override!')
  }

  getModelToJson() {
    throw new Error('Template method. Please override!')
  }
}


module.exports = { Conector }