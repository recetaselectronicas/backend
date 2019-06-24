const { Criteria } = require('../criteria')

// Clase base para todos los criterios que sean de institucion especificamente
// Satisfacen cuando satisface el operador
class InstitutionCriteria extends Criteria {
  getEntity() {
    return 'INSTITUTION'
  }
}

module.exports = { InstitutionCriteria }