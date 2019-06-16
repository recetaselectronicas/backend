/* eslint-disable no-unused-vars */

const object = require('lodash/object')
const { Predicate } = require('../predicates/predicate')

// Clase base para todos los operadores =, >, <, isNull, etc
class Operator extends Predicate {
  // Se valida que el model toenga el valor del atributo que está evaluando
  doValidate(model) {
    // Se pregunta de esta manera ya que si el valor del atributo fuera false, o 0
    // o null o undefined o NaN esto fallaría al ensamblar, cuando en realidad
    // son valores válidos
    if (!object.has(model, 'attributeValue')) {
      throw new Error('Error while assembling Operator. No attributeValue given')
    }
  }

  // Se guarda el valor del atributo a compar
  // Las subclases que requieran de valores extras,
  // deberán sobreescribir este metodo el el doValidate y llamar a super
  doInitialize(model) {
    this.loadAttributeValue(model.attributeValue)
  }

  loadAttributeValue(attributeValue) {
    this.attributeValue = attributeValue
  }

  toJson() {
    return {
      operator: this.getName(),
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

// Clase que representa una operacion de igualdad
// Satisface cuando el valor que se recibió y el esperado son
// iguales en tipo y valor
class EqualOperator extends Operator {
  // Se valida que el modelo tenga el valor esperado
  // De nuevo se hace asi para chequear si vino el parametro sin importar el valor
  // Se sobreescribe doValidate y se llama a super para agregar las validaciones necesarias
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling EqualOperator. No expectedValue given')
    }
  }

  // Se llama a super para que guarde lo que necesita
  // y se guarda además el valor esperado
  doInitialize(model) {
    super.doInitialize(model)
    this.expectedValue = model.expectedValue
  }

  // Hace la bendita comparación!!
  satisfies() {
    return this.attributeValue === this.expectedValue
  }

  getName() {
    return 'EQUAL'
  }

  getModelToJson() {
    return {
      expectedValue: this.expectedValue
    }
  }
}

class GreaterOperator extends Operator {
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'expectedValue')) {
      throw new Error('Error while assembling EqualOperator. No expectedValue given')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.expectedValue = model.expectedValue
  }

  satisfies() {
    return this.attributeValue > this.expectedValue
  }

  getName() {
    return 'GREATER'
  }

  getModelToJson() {
    return {
      expectedValue: this.expectedValue
    }
  }
}

module.exports = {
  Operator,
  EqualOperator,
  GreaterOperator
}