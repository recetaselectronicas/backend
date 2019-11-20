/* eslint-disable no-param-reassign */
const { DoctorRepository } = require('../../../repositories/doctorRepository')

const checkSpecialtyDataField = async (actualDataFields, dataFields) => {
  const actualSpecialty = actualDataFields.specialty
  const newSpecialty = dataFields.specialty || actualDataFields.specialty

  if (!newSpecialty.error) {
    if (newSpecialty.value !== actualSpecialty.value) {
      const exists = await DoctorRepository.specialtyExists(newSpecialty.value)
      if (!exists) {
        newSpecialty.error = 'Invalid field value'
      }
    }
  }
}

module.exports = { checkSpecialtyDataField }