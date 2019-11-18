const { PharmacistRequestRepository } = require('../../../repositories/pharmacistRequestRepository')

const createLinkupPharmacistRequest = async (idPharmacist, { medicalInsurance }) => PharmacistRequestRepository.create({
  idMedicalInsurance: medicalInsurance.id,
  idPharmacist,
})

module.exports = { createLinkupPharmacistRequest }