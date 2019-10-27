const { userTypes } = require('../../permissions/identifiedUser')
const { linkUpPatient } = require('./linkUpPatient')
const { linkUpMedicalInsurance } = require('./medicalInsurance/linkUpMedicalInsurance')
const errors = require('../../utils/errors')

const linkUpMap = {
  [userTypes.AFFILIATE]: linkUpPatient,
  [userTypes.MEDICAL_INSURANCE]: linkUpMedicalInsurance,
}
const linkUpUsers = async (user, body) => {
  if (linkUpMap[user.type]) {
    return linkUpMap[user.type](user.id, body)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { linkUpUsers }