const { DoctorRepository } = require('../../repositories/doctorRepository')

let specialties = []

DoctorRepository.getAllSpecialties().then((spe) => {
  specialties = spe
}).catch((err) => {
  console.error('error while retrieving specialties', err)
})

const getValidSpecialties = () => {
  return specialties
}

module.exports = { getValidSpecialties }