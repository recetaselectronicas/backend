const moment = require('moment')
const { validateUnlinkPharmacist } = require('./validations/validateUnlinkPharmacist')
const { ReceptionRepository } = require('../../../repositories/receptionRepository')

const unlinkPharmacist = async (pharmacistId, body) => {
  const datetime = moment()
  await validateUnlinkPharmacist(pharmacistId, body, datetime)
  await ReceptionRepository.unlink(pharmacistId, body.medicalInsurance.id, datetime)
}

module.exports = { unlinkPharmacist }