const { DoctorRequestRepository } = require('../../../repositories/doctorRequestRepository')

const getDoctorLinkUpRequests = async doctor => DoctorRequestRepository.getRequests(doctor.id)

module.exports = { getDoctorLinkUpRequests }