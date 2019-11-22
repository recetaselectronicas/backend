/* eslint-disable no-param-reassign */
const { PharmacistRepository } = require('../../../repositories/pharmacistRepository')

const checkMatriculationDataField = async (actualDataFields, dataFields) => {
  const actualMatriculation = actualDataFields.matriculation
  const newMatriculation = dataFields.matriculation || actualDataFields.matriculation

  if (!newMatriculation.error) {
    if (newMatriculation.value !== actualMatriculation.value) {
      const exists = await PharmacistRepository.matriculationExists(newMatriculation.value)
      if (exists) {
        newMatriculation.error = 'Matriculation already registered'
      }
    }
  }
}

module.exports = { checkMatriculationDataField }