const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')

const createLinkupDoctorRequest = async (idDoctor, { medicalInsurance }) => DoctorRequestRepository.create({
  idMedicalInsurance: medicalInsurance.id,
  idDoctor,
})

module.exports = { createLinkupDoctorRequest }