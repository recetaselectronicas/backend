const getPatientDataFromFields = (dataFields) => {
  return Object.keys(dataFields).reduce((patientData, key) => {
    // eslint-disable-next-line no-param-reassign
    patientData[key] = dataFields[key].value
    return patientData
  }, {})
}

module.exports = { getPatientDataFromFields }