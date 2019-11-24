const { PrescriptionRepository } = require('../../repositories/prescriptions-repository')
const { getAvailableFilters } = require('./getAvailableFilters')
const { getAvailableOrders } = require('./getAvailableOrders')
const { computeAppliedFilters } = require('./computeAppliedFilters')
const { computeAppliedOrders } = require('./computeAppliedOrders')
const { userTypes } = require('../../permissions/identifiedUser')
const errors = require('../../utils/errors')

const getPrescriptionsStatistics = async (user, query) => {
  if (user.type !== userTypes.MEDICAL_INSURANCE) {
    throw errors.newBadRequestError('invalid userType given')
  }
  const availableFilters = getAvailableFilters()
  const availableOrders = getAvailableOrders()
  const appliedFilters = computeAppliedFilters(availableFilters, query)
  const appliedOrders = computeAppliedOrders(availableOrders, query)
  const results = await PrescriptionRepository.getStatistics(user.id, appliedFilters, appliedOrders)
  const response = {
    results,
    availableFilters,
    appliedFilters,
    availableOrders,
    appliedOrders
  }
  return response
}

module.exports = { getPrescriptionsStatistics }
