const { userTypes } = require('../../permissions/identifiedUser')
const { linkUpPatient } = require('./linkUpPatient')
const errors = require('../../utils/errors')

const linkUpMap = {
  [userTypes.AFFILIATE]: linkUpPatient,
}
const linkUpUsers = async (user, body) => {
  if (linkUpMap[user.type]) {
    return linkUpMap[user.type](user.id, body)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { linkUpUsers }