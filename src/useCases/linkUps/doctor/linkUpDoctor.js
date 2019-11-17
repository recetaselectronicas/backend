const { validateLinkUpDoctor } = require('./validations/validateLinkUpDoctor')
const { createLinkupDoctorRequest } = require('./createLinkupDoctorRequest')

const linkUpDoctor = async (doctorId, body) => {
  await validateLinkUpDoctor(doctorId, body)
  await createLinkupDoctorRequest(doctorId, body)
}

module.exports = { linkUpDoctor }