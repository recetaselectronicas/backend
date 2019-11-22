/* eslint-disable no-param-reassign */
const { DoctorRepository } = require('../../../repositories/doctorRepository')

const checkNationalMatriculationDataField = async (actualDataFields, dataFields) => {
  const actualNationalMatriculation = actualDataFields.nationalMatriculation
  const newNationalMatriculation = dataFields.nationalMatriculation || actualDataFields.nationalMatriculation

  if (!newNationalMatriculation.error) {
    if (newNationalMatriculation.value !== actualNationalMatriculation.value) {
      const exists = await DoctorRepository.nationalMatriculationExists(newNationalMatriculation.value)
      if (exists) {
        newNationalMatriculation.error = 'Matriculation already registered'
      }
    }
  }
}

module.exports = { checkNationalMatriculationDataField }