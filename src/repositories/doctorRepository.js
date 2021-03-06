/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const { Doctor } = require('../domain/doctor')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')

const knex = require('../init/knexConnection')
const { DOCTOR, SPECIALITY, ATTENTION, MEDICAL_BOOKLET } = require('./tablesNames')
const { dateTimeFormat } = require('../utils/utils')


class DoctorRepository {
  create(_doctor) {
    const doctor = Doctor.fromObject(_doctor)
    if (doctor.id) {
      throw newEntityAlreadyCreated('Doctor allready created')
    }
    const insertableDoctor = doctor.toPlainObject()
    insertableDoctor.password = doctor.password
    delete insertableDoctor.specialty
    delete insertableDoctor.entryDate
    delete insertableDoctor.leavingDate

    return knex(DOCTOR)
      .insert(insertableDoctor)
      .then(([id]) => id)
  }

  update(doctorId, doctorData) {
    return knex
      .table(DOCTOR)
      .update(doctorData)
      .where({ id: doctorId })
      .then(updates => !!updates)
  }

  async updateSpecialty(doctorId, specialtyId) {
    await knex
      .table(ATTENTION)
      .update({ leavingDate: new Date() })
      .where({ idDoctor: doctorId })
      .then(updates => !!updates)
    return this.registerSpecialty(doctorId, specialtyId)
  }

  async getById(id) {
    const res = await knex
      .select()
      .table(DOCTOR)
      .where('id', id)
      .first()
    if (!res) {
      throw newNotFoundError(`No doctor was found with id ${id}`)
    }
    const doctor = Doctor.fromObject(res)
    await this.fillDoctor(doctor)
    return doctor
  }

  async fillDoctor(doctor) {
    const specialty = await knex
      .select()
      .table(SPECIALITY)
      .innerJoin(ATTENTION, `${ATTENTION}.id_specialty`, `${SPECIALITY}.id`)
      .where({
        [`${ATTENTION}.id_doctor`]: doctor.id,
        [`${ATTENTION}.leaving_date`]: null
      })
      .first()
    if (specialty) {
      doctor.specialty = specialty
    }
  }

  userNameExists(userName) {
    return knex
      .select('id')
      .from(DOCTOR)
      .where({ userName })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }

  nationalMatriculationExists(nationalMatriculation) {
    return knex
      .select('id')
      .from(DOCTOR)
      .where({ nationalMatriculation })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }

  specialtyExists(specialtyId) {
    return knex
      .select('id')
      .from(SPECIALITY)
      .where({
        id: specialtyId
      })
      .limit(1)
      .first()
      .then(obj => !!(obj && obj.id))
  }

  registerSpecialty(doctorId, specialtyId) {
    return knex
      .into(ATTENTION)
      .insert({
        idSpecialty: specialtyId,
        idDoctor: doctorId
      })
      .then(([id]) => id)
  }

  confirm(id) {
    return knex
      .table(DOCTOR)
      .update({ confirmed: true })
      .where({ id })
      .then(updates => !!updates)
  }

  getAllSpecialties() {
    return knex
      .select()
      .from(SPECIALITY)
  }

  getByNicNumberAndGender(nicNumber, gender) {
    return knex
      .select()
      .from(DOCTOR)
      .where({ nicNumber, gender })
      .then(doctors => doctors.map(doctor => Doctor.fromJson(doctor)))
  }

  getByNationalMatriculation(nationalMatriculation) {
    return knex
      .select()
      .from(DOCTOR)
      .where({ nationalMatriculation })
      .then(doctors => doctors.map(doctor => Doctor.fromJson(doctor)))
  }
}

module.exports = {
  DoctorRepository: new DoctorRepository()
}
