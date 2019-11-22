
const checkCommonDataFields = async (actualDataFields, dataFields) => {
  Object.keys(dataFields).forEach((key) => {
    const actualField = actualDataFields[key]
    const newField = dataFields[key]
    newField.error = ''
    if (!actualField) {
      newField.error = 'Unrecognized field'
    } else if (!actualField.editable && actualField.value !== newField.value) {
      newField.error = 'Field is not editable'
    } else if (actualField.required && !newField.value) {
      newField.error = 'Field is required'
    } else if (actualField.availableValues && !actualField.availableValues.map(val => val.id).includes(newField.value)) {
      newField.error = 'Invalid field value'
    }
  })
}

module.exports = { checkCommonDataFields }