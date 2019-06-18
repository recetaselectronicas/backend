const { Criteria } = require('../criteria')

// Clase base para todos los criterios que sean de afiliado especificamente
// Satisfacen cuando satisface el operador
class AffiliateCriteria extends Criteria {
  getEntity() {
    return 'AFFILIATE'
  }

  satisfies() {
    if (this.prescription.affiliate.id) {
      return super.satisfies()
    }
    return false
  }
}

module.exports = { AffiliateCriteria }