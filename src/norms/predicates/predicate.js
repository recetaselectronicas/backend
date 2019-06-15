/* eslint-disable no-unused-vars */

// Esta es la clase principal de la cual heredan 4 mas
// Es un command. Es decir, primero se carga con valores (initialize)
// y despues se manda a ejecutar (satisfies)
// Posiblemente esta clase tenga que tener un metodo toJson que devuelva
// la representacion de todo el arbol que se forme en formato json y tambien
// un from json. Pero hay que pensarlo bien
class Predicate {
  // Cada una de las subclases sabe que tipo de modelo espera
  // por lo que se delega la validacion e inicializacion a las mismas
  initialize(model) {
    this.validate(model)
    this.doInitialize(model)
    return this
  }

  // Solo se valida que el modelo sea un objeto
  validate(model) {
    if (!model || !(model instanceof Object)) {
      throw new Error('Error while assembling Predicate. No model given or not an Object.')
    }
    this.doValidate(model)
  }

  // Se valida el modelo
  doValidate(model) {
    throw new Error('Template method. Please override!')
  }

  // Se almacenan las variables de interes en el objeto
  doInitialize(model) {
    throw new Error('Template method. Please override!')
  }

  // Se verifica si el predicado satisface lo que debería
  satisfies() {
    throw new Error('Template method. Please override!')
  }
}

module.exports = { Predicate }