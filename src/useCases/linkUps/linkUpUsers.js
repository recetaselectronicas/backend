const { userTypes } = require('../../permissions/identifiedUser')
const { linkUpPatient } = require('./patient/linkUpPatient')
const { linkUpMedicalInsurance } = require('./medicalInsurance/linkUpMedicalInsurance')
const { linkUpDoctor } = require('./doctor/linkUpDoctor')
const { linkUpPharmacist } = require('./pharmacist/linkUpPharmacist')
const errors = require('../../utils/errors')

const linkUpMap = {
  [userTypes.AFFILIATE]: linkUpPatient,
  [userTypes.MEDICAL_INSURANCE]: linkUpMedicalInsurance,
  [userTypes.DOCTOR]: linkUpDoctor,
  [userTypes.PHARMACIST]: linkUpPharmacist,
}
const linkUpUsers = async (user, body) => {
  if (linkUpMap[user.type]) {
    return linkUpMap[user.type](user.id, body)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { linkUpUsers }