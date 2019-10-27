const { userTypes } = require('../../permissions/identifiedUser')
const { verifyPatient } = require('./verifyPatient')
const { verifyDoctor } = require('./verifyDoctor')
const errors = require('../../utils/errors')

const verificationMap = {
  [userTypes.AFFILIATE]: verifyPatient,
  [userTypes.DOCTOR]: verifyDoctor,
}
const verifyUser = async (type, token) => {
  if (verificationMap[type]) {
    return verificationMap[type](token)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { verifyUser }