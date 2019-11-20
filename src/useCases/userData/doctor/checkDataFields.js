/* eslint-disable no-param-reassign */
const { UserRepository } = require('../../../repositories/userRepository')

const checkDataFields = async (actualDataFields, dataFields) => {
  const finalDataFields = {}
  Object.keys(dataFields).forEach((key) => {
    const actualField = actualDataFields[key]
    const newField = dataFields[key]
    if (!actualField) {
      newField.error = 'Unrecognized field'
    } else if (!actualField.editable && actualField.value !== newField.value) {
      newField.error = 'Field is not editable'
    } else if (actualField.required && !newField.value) {
      newField.error = 'Field is required'
    } else if (actualField.availableValues && !actualField.availableValues.includes(newField.value)) {
      newField.error = 'Invalid field value'
    } else if (actualField.value !== newField.value) {
      finalDataFields[key] = { ...newField }
    }
  })
  const actualNicType = actualDataFields.nicType
  const actualNicNumber = actualDataFields.nicNumber
  const newNicType = dataFields.nicType
  const newNicNumber = dataFields.nicNumber
  if ((newNicType && newNicType.value !== actualNicType.value) || (newNicNumber && newNicNumber.value !== actualNicNumber.value)) {
    const exists = await UserRepository.nicNumberAndTypeExists((newNicNumber && newNicNumber.value) || actualNicNumber.value, (newNicType && newNicType.value) || actualNicType.value)
    if (exists) {
      if (dataFields.nicNumber) {
        dataFields.nicNumber.error = 'NicNumber allready registered'
      } else if (dataFields.nicType) {
        dataFields.nicType.error = 'NicNumber allready registered for this type'
      }
    }
  }
  const hasErrors = Object.keys(dataFields).some(key => !!dataFields[key].error)
  const response = { hasErrors: false, fields: finalDataFields }
  if (hasErrors) {
    response.hasErrors = true
    response.fields = dataFields
  }
  return response
}

module.exports = { checkDataFields }