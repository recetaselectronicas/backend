
const getNewMultiDataField = (fieldName, label, value = '', availableValues = [], editable = true, required = true, error = '') => {
  return {
    fieldName,
    label,
    value,
    availableValues,
    editable,
    required,
    error,
  }
}

module.exports = { getNewMultiDataField }