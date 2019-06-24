/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const { Doctor } = require('../domain/doctor')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')

const knex = require('../init/knexConnection')
const { DOCTOR, SPECIALITY, ATTENTION } = require('./tablesNames')

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
    }
    return knex(DOCTOR)
      .insert(insertableDoctor)
      .then(([id]) => id)
  }

  getAll() {
    return new Promise((resolve, reject) => resolve([...this.doctors]))
  }

  async getById(id) {
    const res = await knex.select().table(DOCTOR).where('id', id).first()
    if (!res) {
      throw newNotFoundError(`No doctor was found with id ${id}`)
    }
    const doctor = Doctor.fromObject(res)
    await this.fillDoctor(doctor)
    return doctor
  }

  async fillDoctor(doctor) {
    const specialty = await knex.select().table(SPECIALITY)
      .innerJoin(ATTENTION, `${ATTENTION}.id_specialty`, `${SPECIALITY}.id`)
      .where({
        [`${ATTENTION}.id_doctor`]: doctor.id
      })
      .first()
    if (specialty) {
      doctor.specialty = specialty
    }
  }
}
module.exports = {
  DoctorRepository: new DoctorRepository(),
}
