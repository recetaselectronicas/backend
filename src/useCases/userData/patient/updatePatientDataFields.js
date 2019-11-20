const { getPatientDataFields } = require('./getPatientDataFields')
const { checkCommonDataFields } = require('../checkCommonDataFields')
const { checkNicDataField } = require('../checkNicDataField')
const { getPatientDataFromFields } = require('./getPatientDataFromFields')
const { PatientRepository } = require('../../../repositories/patientRepository')

const updatePatientDataFields = async (patientId, dataFields) => {
  const actualDataFields = await getPatientDataFields(patientId)
  await checkCommonDataFields(actualDataFields, dataFields)
  await checkNicDataField(actualDataFields, dataFields)
  const hasErrors = Object.keys(dataFields).some(key => !!dataFields[key].error)
  if (!hasErrors) {
    const patientData = getPatientDataFromFields(actualDataFields, dataFields)
    if (Object.keys(patientData).length) {
      await PatientRepository.update(patientId, patientData)
    }
  }
  return { hasErrors, fields: dataFields }
}

module.exports = { updatePatientDataFields }