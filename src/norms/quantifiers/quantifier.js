/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */

const object = require('lodash/object')
const lang = require('lodash/lang')
const { Predicate } = require('../predicates/predicate')

// Clase base para los cuantificadores EXISTS, FORALL, etc
class Quantifier extends Predicate {
  // Se valida que el modelo tenga una lista de predicados ya que
  // todos los cuantificadores trabajan con listas
  doValidate(model) {
    if (!model.predicates || !(model.predicates instanceof Array)) {
      throw new Error('Error while assembling Quantifier. No predicates given or not an Array.')
    }
    if (!model.predicates.length) {
      throw new Error('Error while assembling Quantifier. No predicate given on predicates array')
    }
    if (!model.predicates.every(predicate => predicate instanceof Predicate)) {
      throw new Error('Error while assembling Quantifier. Not all predicates are Predicate')
    }
  }

  // Se guarda el valor
  doInitialize(model) {
    this.predicates = model.predicates
  }
}

// Clase base para los cuantificadores de existencia EXISTS_AT_LEAST y EXIST_EXACTLY
class ExistsQuantifier extends Quantifier {
  // Se valida ademas de lo que valida el predicado, que se envie una cantidad
  // valida a verificar existencia
  doValidate(model) {
    super.doValidate(model)
    if (!object.has(model, 'quantity') || !lang.isNumber(model.quantity)) {
      throw new Error('Error while assembling ExistsQuantifier. No quantity given or not a Number.')
    }
    if (isNaN(model.quantity)) {
      throw new Error('Error while assembling ExistsQuantifier. Quantity given is NaN')
    }
  }

  // Se guarda ademas de lo que gurda el padre, la cantidad ingresada
  doInitialize(model) {
    super.doInitialize(model)
    this.quantity = model.quantity
  }
}

// Clase Exists At Least (Existe por lo menos)
// Satisface si por lo menos cierta cantidad de predicados se satisficieron
// la cantidad es la ingresada en el modelo
class ExistsAtLeastQuantifier extends ExistsQuantifier {
  // Va a iterar por todos los predicados y cuando detecte que hay mas erroneos
  // de los que se esperaba, devuelve false
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
}

// Clase ForAll (Para Todo)
// Satisface cuando todos los predicados que tiene se satisfacen
// No requiere cantidad
class ForAllQuantifier extends Quantifier {
  // Valida que todos los predicados cumplan
  satisfies() {
    return this.predicates.every(predicate => predicate.satisfies())
  }
}

module.exports = {
  Quantifier,
  ExistsQuantifier,
  ExistsAtLeastQuantifier,
  ForAllQuantifier
}