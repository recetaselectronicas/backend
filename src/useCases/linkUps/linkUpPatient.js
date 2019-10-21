const { validateLinkUpPatient } = require('./validateLinkUpPatient')
const { createLinkUpPatientRequest } = require('./createLinkUpPatientRequest')

const linkUpPatient = async (patientId, body) => {
  await validateLinkUpPatient(patientId, body)
  await createLinkUpPatientRequest(patientId, body)
}

module.exports = { linkUpPatient }