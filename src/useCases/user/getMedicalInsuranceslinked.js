const { userTypes } = require('../../permissions/identifiedUser')
const { getDoctorMedicalInsurancesLinked } = require('./doctor/getDoctorMedicalInsurancesLinked')
const { getAffiliateMedicalInsurancesLinked } = require('./affiliate/getAffiliateMedicalInsurancesLinked')
const errors = require('../../utils/errors')

const linkUpRequestMap = {
  [userTypes.DOCTOR]: getDoctorMedicalInsurancesLinked,
  [userTypes.AFFILIATE]: getAffiliateMedicalInsurancesLinked
}

const getMedicalInsuranceslinked = (user) => {
  if (linkUpRequestMap[user.type]) {
    return linkUpRequestMap[user.type](user)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { getMedicalInsuranceslinked }