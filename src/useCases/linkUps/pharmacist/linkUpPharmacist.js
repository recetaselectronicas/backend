const { validateLinkUpPharmacist } = require('./validations/validateLinkUpPharmacist')
const { createLinkupPharmacistRequest } = require('./createLinkupPharmacistRequest')

const linkUpPharmacist = async (pharmacistId, body) => {
  await validateLinkUpPharmacist(pharmacistId, body)
  await createLinkupPharmacistRequest(pharmacistId, body)
}

module.exports = { linkUpPharmacist }