
const getNewSimpleDataField = (fieldName, label, value = '', editable = true, required = true, error = '') => {
  return {
    fieldName,
    label,
    value,
    editable,
    required,
    error,
  }
}

module.exports = { getNewSimpleDataField }