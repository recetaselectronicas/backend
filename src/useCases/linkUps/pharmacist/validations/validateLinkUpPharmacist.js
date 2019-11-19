const lang = require('lodash/lang')
const array = require('lodash/array')
const errors = require('../../../../utils/errors')
const { codes } = require('../../../../codes/entities-codes')
const { validateMedicalInsuranceExists } = require('../../../validations/validateMedicalInsuranceExists')
const { validatePharmacistIsAbleToLink } = require('./validatePharmacistIsAbleToLink')
const { validatePharmacistLinkUpRequests } = require('./validatePharmacistLinkUpRequests')

const MEDICAL_INSURANCE = codes.MEDICAL_INSURANCE.name

const validateLinkUpPharmacist = async (pharmacistId, body) => {
  let bodyErrors = [
    errors.getObjectDoesntMatchError(body, 'medicalInsurance.id', id => lang.isNumber(id) && id > 0, MEDICAL_INSURANCE, 'id'),
  ]
  bodyErrors = array.compact(bodyErrors)
  if (bodyErrors.length) {
    throw errors.newBadRequestError('error while linking-up pharmacist', bodyErrors)
  }
  const { medicalInsurance } = body
  await validateMedicalInsuranceExists(medicalInsurance.id)
  await validatePharmacistIsAbleToLink(pharmacistId, medicalInsurance.id)
  await validatePharmacistLinkUpRequests(pharmacistId, medicalInsurance.id)
}

module.exports = { validateLinkUpPharmacist }
