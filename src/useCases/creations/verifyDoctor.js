const { userTypes } = require('../../permissions/identifiedUser')
const { verifyConfirmationToken } = require('../confirmations/verifyConfirmationToken')
const { DoctorRepository } = require('../../repositories/doctorRepository')

const verifyDoctor = async (token) => {
  const data = verifyConfirmationToken(token, userTypes.DOCTOR)
  await DoctorRepository.confirm(data.id)
}

module.exports = { verifyDoctor }