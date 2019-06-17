const { Predicate } = require('../predicates/predicate')

// Clase base para las Normas, Normas por estado y Reglas
// Declara una interfaz ejecutable capaz de devolver el o los
// errores que se encuentren
class Executable extends Predicate {
  executeAndGetError() {
    if (!this.satisfies()) {
      return this.getError()
    }
    return null
  }

  getError() {
    throw new Error('Template method. Please override!')
  }

  toJson() {
    return {
      type: 'EXECUTABLE',
      name: this.getName()
    }
  }

  getName() {
    throw new Error('Template method. Please override!')
  }
}

module.exports = { Executable }