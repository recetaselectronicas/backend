const { userTypes } = require('../../permissions/identifiedUser')
const { createPatient } = require('./createPatient')
const { createDoctor } = require('./createDoctor')
const { createPharmacist } = require('./createPharmacist')
const errors = require('../../utils/errors')

const creationMap = {
  [userTypes.AFFILIATE]: createPatient,
  [userTypes.DOCTOR]: createDoctor,
  [userTypes.PHARMACIST]: createPharmacist,
}
const createUser = async (type, user) => {
  if (creationMap[type]) {
    return creationMap[type](user)
  }
  throw errors.newBadRequestError('invalid userType given')
}

module.exports = { createUser }