const moment = require('moment')
const { PatientRepository } = require('../../repositories/patientRepository')
const errors = require('../../utils/errors')

const validatePatientIsAbleToAffiliate = async (patientId) => {
  const patient = await PatientRepository.getById(patientId)
  if (!patient) {
    throw errors.newBadRequestError('patient does not exists')
  }
  const isAbleToAffiliate = await PatientRepository.isAbleToAffiliate(patientId, moment())
  if (!isAbleToAffiliate) {
    throw errors.newBadRequestError('El paciente ya esta afiliado')
  }
}

module.exports = { validatePatientIsAbleToAffiliate }