const { Executable } = require('./executable')
const { NormState } = require('./normState')
const { states } = require('../../state-machine/state')

// Clase que representa a toda la norma entera
// Necesita de una descripcion, los estados para los cuales
// tiene reglas y un estado para ejecutar que es para saber
// que estado se quiere ejecutar
class Norm extends Executable {
  doValidate(model) {
    if (!model.description) {
      throw new Error('Error while assembling Norm. No description given.')
    }
    if (!model.states || !(model.states instanceof Array)) {
      throw new Error('Error while assembling Norm. No states given or not an Array.')
    }
    if (!model.states.every(state => state instanceof NormState)) {
      throw new Error('Error while assembling Norm. Not all states given ar NormState.')
    }
    if (!model.executionStatus || !states[model.executionStatus]) {
      throw new Error('Error while assembling Norm. No executionStatus given or not a valid state.')
    }
  }

  doInitialize(model) {
    this.description = model.description
    this.states = model.states
    this.executionStatus = model.executionStatus
    this.actualStatus = this.states.find(state => state.isState(this.executionStatus))
      || new NormState().initialize({ state: states.ISSUED.id, description: 'DUMMY', rules: [] })
  }

  satisfies() {
    return this.actualStatus.satisfies()
  }

  toJson() {
    return {
      ...super.toJson(),
      description: this.description,
      states: this.states.map(state => state.toJson())
    }
  }

  getError() {
    return this.actualStatus.getError()
  }

  getName() {
    return 'NORM'
  }
}

module.exports = { Norm }