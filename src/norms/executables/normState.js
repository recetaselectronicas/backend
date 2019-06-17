const array = require('lodash/array')
const { Executable } = require('./executable')
const { Rule } = require('./rule')
const { statesMap } = require('../../state-machine/state')

// Clase que representa una norma particular para un estado
// Necesita de un estado al que aplica valido, una descripcion
// y todas las reglas que aplican a dicha norma
class NormState extends Executable {
  doValidate(model) {
    if (!model.status || !statesMap[model.status]) {
      throw new Error('Error while assembling NormState. No status given or status not valid.')
    }
    if (!model.description) {
      throw new Error('Error while assembling NormState. No description given.')
    }
    if (!model.rules || !(model.rules instanceof Array)) {
      throw new Error('Error while assembling State. No rules given or not an Array.')
    }
    if (!model.rules.every(rule => rule instanceof Rule)) {
      throw new Error('Error while assembling State. Not all given rules are Rule.')
    }
  }

  doInitialize(model) {
    this.status = model.status
    this.description = model.description
    this.rules = model.rules
  }

  satisfies() {
    return this.rules.every(rule => rule.satisfies())
  }

  toJson() {
    return {
      ...super.toJson(),
      status: this.status,
      description: this.description,
      rules: this.rules.map(rule => rule.toJson())
    }
  }

  getError() {
    const errors = array.compact(this.rules.map(rule => rule.executeAndGetError()))
    if (errors.length) {
      return errors
    }
    return null
  }

  getName() {
    return 'NORM_STATE'
  }

  isState(status) {
    return this.status === status
  }
}

module.exports = { NormState }