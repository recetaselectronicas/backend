/* eslint-disable class-methods-use-this */
const { Doctor } = require('../domain/doctor')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')

const knex = require('../init/knexConnection')
const { DOCTOR } = require('./tablesNames')

class DoctorRepository {
  constructor() {
    this.doctors = []
  }

  create(_doctor) {
    const doctor = Doctor.fromObject(_doctor)
    if (doctor.id) {
      throw newEntityAlreadyCreated('Doctor allready created')
    }
    const plainDoctor = doctor.toPlainObject()
    const insertableDoctor = {
      name: plainDoctor.name,
      last_name: plainDoctor.lastName,
      contact_number: plainDoctor.contactNumber,
      nationality: plainDoctor.nationality,
      address: plainDoctor.address,
      email: plainDoctor.email,
      national_matriculation: plainDoctor.nationalMatriculation,
      provincial_matriculation: plainDoctor.provincialMatriculation,
      specialty: plainDoctor.specialty.id,
    }
    return knex(DOCTOR)
      .insert(insertableDoctor)
      .then(([id]) => id)
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.doctors]))
  }

  getById(id) {
    return knex
      .select()
      .table(DOCTOR)
      .where('id', id)
      .first()
      .catch((error) => {
        console.log('error getting by id doctor', error)
        throw newNotFoundError(`No doctor was found with id ${id}`)
      })
  }
}
module.exports = {
  DoctorRepository: new DoctorRepository(),
}
