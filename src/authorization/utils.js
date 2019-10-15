const { userTypes } = require('../permissions/identifiedUser')

const getDoctorSubject = doctor => `${userTypes.DOCTOR}_${doctor.id}`
const getAffiliateSubject = affiliate => `${userTypes.AFFILIATE}_${affiliate.id}`
const getPharmacistSubject = pharmacist => `${userTypes.PHARMACIST}_${pharmacist.id}`
const getDoctorAudience = getDoctorSubject
const getAffiliateAudience = getAffiliateSubject
const getPharmacistAudience = getPharmacistSubject
const getPrivateKey = () => 'UNIFY_authorization_module'

module.exports = {
  getDoctorSubject,
  getAffiliateSubject,
  getPharmacistSubject,
  getDoctorAudience,
  getAffiliateAudience,
  getPharmacistAudience,
  getPrivateKey
}