const { requestStatus } = require('../../../repositories/defaults')
const errors = require('../../../utils/errors')
const { AffiliateRequestRepository } = require('../../../repositories/affiliateRequestRepository')
const { AffiliateRepository } = require('../../../repositories/affiliateRepository')
const { PlanRepository } = require('../../../repositories/planRepository')
const { buildUpdateRequest } = require('../buildUpdateRequest')

const updateMedicalInsuranceLinkUpAffiliateRequest = async (user, body) => {
  const request = await AffiliateRequestRepository.getRequest(body.id)
  if (!request || request.status !== requestStatus.PENDING) {
    throw errors.newForbiddenResourceException()
  }
  const planExists = await PlanRepository.planExists(request.idPlan, user.id)
  if (!planExists) {
    throw errors.newForbiddenResourceException()
  }
  await AffiliateRequestRepository.updateStatus(request.id, buildUpdateRequest(body))
  if (body.status === requestStatus.ACCEPTED) {
    const affiliate = {
      idPatient: request.idPatient,
      idPlan: request.idPlan,
      code: request.code,
      category: request.category,
      imageCredential: request.imageCredential
    }
    await AffiliateRepository.create(affiliate)
  }
}

module.exports = { updateMedicalInsuranceLinkUpAffiliateRequest }