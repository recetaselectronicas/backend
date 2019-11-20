const getPatientDataFromFields = (actualDataFields, dataFields) => {
  return Object.keys(dataFields).reduce((patientData, key) => {
    if (actualDataFields[key].value !== dataFields[key].value) {
      // eslint-disable-next-line no-param-reassign
      patientData[key] = dataFields[key].value
    }
    return patientData
  }, {})
}

module.exports = { getPatientDataFromFields }