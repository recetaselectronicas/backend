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
    id = +id
    return new Promise((resolve, reject) => {
      const doctor = this.doctors.find(doctor => doctor.id === id)
      if (doctor) {
        return resolve(Doctor.fromObject(doctor))
      }
      return reject(newNotFoundError(`No doctor was found with id ${id}`))
    })
  }
}
module.exports = {
  DoctorRepository: new DoctorRepository(),
}
