const moment = require('moment')
const { unlinkMedicalInsuranceAffiliate } = require('./unlinkMedicalInsuranceAffiliate')
const { validateUnlinkMedicalInsuranceAffiliate } = require('./validateUnlinkMedicalInsuranceAffiliate')
const { unlinkDoctor } = require('../doctor/unlinkDoctor')
const { unlinkPharmacist } = require('../pharmacist/unlinkPharmacist')

const unlinkMedicalInsurance = async (medicalInsuranceId, body) => {
  const datetime = moment()
  if (body.affiliate) {
    await validateUnlinkMedicalInsuranceAffiliate(medicalInsuranceId, body.affiliate, datetime)
    await unlinkMedicalInsuranceAffiliate(body.affiliate.patient.id, datetime)
  }
  if (body.doctor) {
    await unlinkDoctor(body.doctor.id, { medicalInsurance: { id: medicalInsuranceId } })
  }
  if (body.pharmacist) {
    await unlinkPharmacist(body.pharmacist.id, { medicalInsurance: { id: medicalInsuranceId } })
  }
}

module.exports = { unlinkMedicalInsurance }