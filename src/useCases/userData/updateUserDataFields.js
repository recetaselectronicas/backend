const { userTypes } = require('../../permissions/identifiedUser')
const { updatePatientDataFields } = require('./patient/updatePatientDataFields')
const { updateDoctorDataFields } = require('./doctor/updateDoctorDataFields')
const { updatePharmacistDataFields } = require('./pharmacist/updatePharmacistDataFields')
const errors = require('../../utils/errors')

const usersMap = {
  [userTypes.AFFILIATE]: updatePatientDataFields,
  [userTypes.DOCTOR]: updateDoctorDataFields,
  [userTypes.PHARMACIST]: updatePharmacistDataFields
}

const updateUserDataFields = (user, data) => {
  if (usersMap[user.type]) {
    return usersMap[user.type](user.id, data)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { updateUserDataFields }