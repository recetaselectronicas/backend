const { PlanRepository } = require('../../repositories/planRepository')
const errors = require('../../utils/errors')

const validateMedicalInsuranceAndPlan = async (medicalInsuranceId, planId) => {
  const planExists = await PlanRepository.planExists(planId, medicalInsuranceId)
  if (!planExists) {
    throw errors.newInvalidValueError('plan does not exist for the given medicalInsurance')
  }
}

module.exports = { validateMedicalInsuranceAndPlan }