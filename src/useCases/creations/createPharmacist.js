const { validateCreatePharmacist } = require('../validations/validateCreatePharmacist')
const { sendConfirmationMail } = require('../confirmations/sendConfirmationMail')
const { generateConfirmationUrl } = require('../confirmations/generateConfirmationUrl')
const { generateConfirmationToken } = require('../confirmations/generateConfirmationToken')
const { PharmacistRepository } = require('../../repositories/pharmacistRepository')
const { Pharmacist } = require('../../domain/pharmacist')
const { userTypes } = require('../../permissions/identifiedUser')

const createPharmacist = async (_pharmacist) => {
  const pharmacist = Pharmacist.fromObject(_pharmacist)
  await validateCreatePharmacist(pharmacist)
  const pharmacistId = await PharmacistRepository.create(pharmacist)
  const confirmationToken = generateConfirmationToken(pharmacistId, pharmacist.userName, userTypes.PHARMACIST)
  const confirmationUrl = generateConfirmationUrl(confirmationToken, userTypes.PHARMACIST)
  await sendConfirmationMail(pharmacist.email, confirmationUrl)
}

module.exports = { createPharmacist }