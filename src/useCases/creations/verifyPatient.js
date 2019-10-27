const { userTypes } = require('../../permissions/identifiedUser')
const { verifyConfirmationToken } = require('../confirmations/verifyConfirmationToken')
const { PatientRepository } = require('../../repositories/patientRepository')

const verifyPatient = async (token) => {
  const data = verifyConfirmationToken(token, userTypes.AFFILIATE)
  await PatientRepository.confirm(data.id)
}

module.exports = { verifyPatient }