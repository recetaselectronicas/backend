/* eslint-disable no-param-reassign */
const { UserRepository } = require('../../repositories/userRepository')

const checkNicDataField = async (actualDataFields, dataFields) => {
  const actualNicType = actualDataFields.nicType
  const actualNicNumber = actualDataFields.nicNumber
  const newNicType = dataFields.nicType || actualDataFields.nicType
  const newNicNumber = dataFields.nicNumber || actualDataFields.nicNumber

  if (!newNicType.error && !newNicNumber.error) {
    if (newNicType.value !== actualNicType.value || newNicNumber.value !== actualNicNumber.value) {
      const exists = await UserRepository.nicNumberAndTypeExists(newNicNumber.value, newNicType.value)
      if (exists) {
        if (dataFields.nicNumber) {
          dataFields.nicNumber.error = 'NicNumber already registered'
        } else if (dataFields.nicType) {
          dataFields.nicType.error = 'NicNumber already registered for this type'
        }
      }
    }
  }
}

module.exports = { checkNicDataField }