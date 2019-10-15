/* eslint-disable no-param-reassign */
const { Patient } = require('../domain/patient')
const { validateCreatePatient } = require('./validations/validateCreatePatient')
const { PatientRepository } = require('../repositories/patientRepository')
const { generateConfirmationToken } = require('./confirmations/generateConfirmationToken')
const { generateConfirmationUrl } = require('./confirmations/generateConfirmationUrl')
const { sendConfirmationMail } = require('./confirmations/sendConfirmationMail')
const { userTypes } = require('../permissions/identifiedUser')

const createPatient = async (_patient) => {
  const patient = Patient.fromObject(_patient)
  await validateCreatePatient(patient)
  const patientId = await PatientRepository.create(patient)
  const confirmationToken = generateConfirmationToken(patientId, patient.userName, userTypes.AFFILIATE)
  const confirmationUrl = generateConfirmationUrl(confirmationToken, userTypes.AFFILIATE)
  await sendConfirmationMail(patient.email, confirmationUrl)
}

module.exports = { createPatient }