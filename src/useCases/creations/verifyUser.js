const { userTypes } = require('../../permissions/identifiedUser')
const { verifyPatient } = require('./verifyPatient')
const { verifyDoctor } = require('./verifyDoctor')
const { verifyPharmacist } = require('./verifyPharmacist')
const errors = require('../../utils/errors')

const verificationMap = {
  [userTypes.AFFILIATE]: verifyPatient,
  [userTypes.DOCTOR]: verifyDoctor,
  [userTypes.PHARMACIST]: verifyPharmacist,
}
const verifyUser = async (type, token) => {
  if (verificationMap[type]) {
    return verificationMap[type](token)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { verifyUser }