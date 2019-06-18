const { Criteria } = require('../criteria')

// Clase base para todos los criterios que sean de institucion especificamente
// Satisfacen cuando satisface el operador
class InstitutionCriteria extends Criteria {
  getEntity() {
    return 'AFFILIATE'
  }

  satisfies() {
    if (this.prescription.institution.id) {
      return super.satisfies()
    }
    return false
  }
}

module.exports = { InstitutionCriteria }