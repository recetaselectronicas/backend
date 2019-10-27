const { validateCreateDoctor } = require('../validations/validateCreateDoctor')
const { sendConfirmationMail } = require('../confirmations/sendConfirmationMail')
const { generateConfirmationUrl } = require('../confirmations/generateConfirmationUrl')
const { generateConfirmationToken } = require('../confirmations/generateConfirmationToken')
const { DoctorRepository } = require('../../repositories/doctorRepository')
const { Doctor } = require('../../domain/doctor')
const { userTypes } = require('../../permissions/identifiedUser')

const createDoctor = async (_doctor) => {
  const doctor = Doctor.fromObject(_doctor)
  await validateCreateDoctor(doctor)
  const doctorId = await DoctorRepository.create(doctor)
  await DoctorRepository.registerSpecialty(doctorId, doctor.specialty.id)
  const confirmationToken = generateConfirmationToken(doctorId, doctor.userName, userTypes.DOCTOR)
  const confirmationUrl = generateConfirmationUrl(confirmationToken, userTypes.DOCTOR)
  await sendConfirmationMail(doctor.email, confirmationUrl)
}

module.exports = { createDoctor }