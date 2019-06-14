/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Predicate } = require('../predicates/predicate')
const errors = require('../../utils/errors')

// Clase base para todos los operadores =, >, <, isNull, etc
class Operator extends Predicate {
  // El modelo debe tener el nombre de la entidad que está evaluando,
  // el nombre del atributo que está evaluando y
  // el valor del atributo que está evaluando
  doValidate(model) {
    if (!model.entity) {
      throw new Error('Error while assembling Operator. No entity given.')
    }
    if (!model.attribute) {
      throw new Error('Error while assembling Operator. No attribute given.')
    }

    // Se pregunta de esta manera ya que si el valor del atributo fuera false, o 0
    // o null o undefined o NaN esto fallaría al ensamblar, cuando en realidad
    // son valores válidos
    if (!object.has(model, 'attributeValue')) {
      throw new Error('Error while assembling Operator. No attributeValue given')
    }

    // Se deja un template method para el Operador que necesite validar algo mas
    this.doSpecificValidate(model)
  }

  doSpecificValidate(model) {
    throw new Error('Template method. Please override!')
  }
}

// Clase que representa una operacion de igualdad
// Satisface cuando el valor que se recibió y el esperado son
// iguales en tipo y valor
class EqualOperator extends Operator {
  // Se valida que el modelo tenga el valor experado
  // De nuevo se hace asi para chequear si vino el parametro sin importar el valor
  doSpecificValidate(model) {
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling EqualOperator. No expectedValue given')
    }
  }

  // Se guardan el nombre de la entidad,
  // el nombre del atributo,
  // el valor del atributo y
  // el valor esperado
  doInitialize(model) {
    this.entity = model.entity
    this.attribute = model.attribute
    this.attributeValue = model.attributeValue
    this.expectedValue = model.expectedValue
  }

  // Hace la bendita comparación!!
  satisfies() {
    return this.attributeValue === this.expectedValue
  }

  // Si no satisface, devuelve un nuevo error de valor incorrecto
  // sino se devuelve null
  // Ver que este es el lugar donde se usa el nombre de la entidad
  // y el nombre del atributo
  getError() {
    if (!this.satisfies()) {
      return errors.newInvalidValueError(`${this.entity} ${this.attribute} must be equals to ${this.expectedValue}`,
        errors.generateFieldCause(this.entity, this.attribute, this.attributeValue, this.expectedValue))
    }
    return null
  }
}

module.exports = {
  Operator,
  EqualOperator
}