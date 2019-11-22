const { getDoctorDataFields } = require('./getDoctorDataFields')
const { checkCommonDataFields } = require('../checkCommonDataFields')
const { checkNicDataField } = require('../checkNicDataField')
const { checkNationalMatriculationDataField } = require('./checkNationalMatriculationDataField')
const { checkSpecialtyDataField } = require('./checkSpecialtyDataField')
const { getDoctorDataFromFields } = require('./getDoctorDataFromFields')
const { DoctorRepository } = require('../../../repositories/doctorRepository')

const updateDoctorDataFields = async (doctorId, dataFields) => {
  const actualDataFields = await getDoctorDataFields(doctorId)
  await checkCommonDataFields(actualDataFields, dataFields)
  await checkNicDataField(actualDataFields, dataFields)
  await checkNationalMatriculationDataField(actualDataFields, dataFields)
  await checkSpecialtyDataField(actualDataFields, dataFields)
  const hasErrors = Object.keys(dataFields).some(key => !!dataFields[key].error)
  if (!hasErrors) {
    const doctorData = getDoctorDataFromFields(actualDataFields, dataFields)
    if (doctorData.specialty) {
      await DoctorRepository.updateSpecialty(doctorId, doctorData.specialty)
      delete doctorData.specialty
    }
    if (Object.keys(doctorData).length) {
      await DoctorRepository.update(doctorId, doctorData)
    }
  }
  return { hasErrors, fields: dataFields }
}

module.exports = { updateDoctorDataFields }