const moment = require('moment')
const { validateUnlinkDoctor } = require('./validations/validateUnlinkDoctor')
const { MedicalBookletRepository } = require('../../../repositories/medicalBookletRepository')

const unlinkDoctor = async (doctorId, body) => {
  const datetime = moment()
  await validateUnlinkDoctor(doctorId, body, datetime)
  await MedicalBookletRepository.unlink(doctorId, body.medicalInsurance.id, datetime)
}

module.exports = { unlinkDoctor }