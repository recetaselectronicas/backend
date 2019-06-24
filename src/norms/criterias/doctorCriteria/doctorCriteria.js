const { Criteria } = require('../criteria')

// Clase base para todos los criterios que sean de doctor especificamente
// Satisfacen cuando satisface el operador
class DoctorCriteria extends Criteria {
  getEntity() {
    return 'DOCTOR'
  }
}

module.exports = { DoctorCriteria }