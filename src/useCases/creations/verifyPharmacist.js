const { userTypes } = require('../../permissions/identifiedUser')
const { verifyConfirmationToken } = require('../confirmations/verifyConfirmationToken')
const { PharmacistRepository } = require('../../repositories/pharmacistRepository')

const verifyPharmacist = async (token) => {
  const data = verifyConfirmationToken(token, userTypes.PHARMACIST)
  await PharmacistRepository.confirm(data.id)
}

module.exports = { verifyPharmacist }