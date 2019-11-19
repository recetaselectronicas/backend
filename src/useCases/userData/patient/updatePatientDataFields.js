const { getPatientDataFields } = require('./getPatientDataFields')
const { checkDataFields } = require('./checkDataFields')
const { getPatientDataFromFields } = require('./getPatientDataFromFields')
const { PatientRepository } = require('../../../repositories/patientRepository')

const updatePatientDataFields = async (patientId, dataFields) => {
  const actualDataFields = await getPatientDataFields(patientId)
  const checkedDataFields = await checkDataFields(actualDataFields, dataFields)
  if (!checkedDataFields.hasErrors) {
    const patientData = getPatientDataFromFields(checkedDataFields.fields)
    if (Object.keys(patientData).length) {
      await PatientRepository.update(patientId, patientData)
    }
  }
  return checkedDataFields
}

module.exports = { updatePatientDataFields }