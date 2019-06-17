const { Criteria } = require('../criteria')

// Clase base para todos los criterios que sean de receta especificamente
// Satisfacen cuando satisface el operador
class PrescriptionCriteria extends Criteria {
  getEntity() {
    return 'PRESCRIPTION'
  }
}

module.exports = { PrescriptionCriteria }