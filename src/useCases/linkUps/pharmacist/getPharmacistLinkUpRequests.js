const { PharmacistRequestRepository } = require('../../../repositories/pharmacistRequestRepository')

const getPharmacistLinkUpRequests = pharmacist => PharmacistRequestRepository.getRequests(pharmacist.id)

module.exports = { getPharmacistLinkUpRequests }