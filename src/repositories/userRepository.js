const knex = require('../init/knexConnection')
const { DOCTOR, PHARMACIST, PATIENT } = require('./tablesNames')

class UserRepository {
  nicNumberAndTypeExists(nicNumber, nicType) {
    const doctorQuery = knex
      .select('id')
      .from(DOCTOR)
      .where({ nicNumber, nicType })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))

    const pharmacistQuery = knex
      .select('id')
      .from(PHARMACIST)
      .where({ nicNumber, nicType })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))

    const patientQuery = knex
      .select('id')
      .from(PATIENT)
      .where({ nicNumber, nicType })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))

    return Promise.all([doctorQuery, pharmacistQuery, patientQuery])
      .then(res => res.some(exists => exists))
  }
}

module.exports = {
  UserRepository: new UserRepository()
}
