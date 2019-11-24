const { getPrescriptionsStatistics } = require('./getPrescriptionsStatistics')
const { mapCSVStatistics } = require('./mapCSVStatistics')
const { mapXMLStatistics } = require('./mapXMLStatistics')
const { mapJSONStatistics } = require('./mapJSONStatistics')
const { userTypes } = require('../../permissions/identifiedUser')
const errors = require('../../utils/errors')

const dataMappers = {
  csv: mapCSVStatistics,
  xml: mapXMLStatistics,
  json: mapJSONStatistics
}

const downloadPrescriptionStatistics = async (user, query, downloadType) => {
  if (user.type !== userTypes.MEDICAL_INSURANCE) {
    throw errors.newBadRequestError('invalid userType given')
  }
  if (!dataMappers[downloadType]) {
    throw errors.newBadRequestError('invalid downloadType given')
  }
  const prescriptionStatistics = await getPrescriptionsStatistics(user, query)
  const response = {
    type: downloadType,
    data: await dataMappers[downloadType](prescriptionStatistics.results)
  }
  return response
}

module.exports = { downloadPrescriptionStatistics }