const { userTypes } = require('../../permissions/identifiedUser')
const { updatePatientDataFields } = require('./patient/updatePatientDataFields')
const errors = require('../../utils/errors')

const usersMap = {
  [userTypes.AFFILIATE]: updatePatientDataFields
}

const updateUserDataFields = (user, data) => {
  if (usersMap[user.type]) {
    return usersMap[user.type](user.id, data)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { updateUserDataFields }