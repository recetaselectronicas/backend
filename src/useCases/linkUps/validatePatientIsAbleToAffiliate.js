const moment = require('moment')
const { PatientRepository } = require('../../repositories/patientRepository')
const errors = require('../../utils/errors')

const validatePatientIsAbleToAffiliate = async (patientId) => {
  const isAbleToAffiliate = await PatientRepository.isAbleToAffiliate(patientId, moment())
  if (!isAbleToAffiliate) {
    throw errors.newBadRequestError('patient allready affiliated')
  }
}

module.exports = { validatePatientIsAbleToAffiliate }