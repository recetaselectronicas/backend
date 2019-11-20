const getDoctorDataFromFields = (actualDataFields, dataFields) => {
  return Object.keys(dataFields).reduce((doctorData, key) => {
    if (actualDataFields[key].value !== dataFields[key].value) {
      // eslint-disable-next-line no-param-reassign
      doctorData[key] = dataFields[key].value
    }
    return doctorData
  }, {})
}

module.exports = { getDoctorDataFromFields }