const { getPharmacistDataFields } = require('./getPharmacistDataFields')
const { checkCommonDataFields } = require('../checkCommonDataFields')
const { checkNicDataField } = require('../checkNicDataField')
const { checkMatriculationDataField } = require('./checkMatriculationDataField')
const { getPharmacistDataFromFields } = require('./getPharmacistDataFromFields')
const { PharmacistRepository } = require('../../../repositories/pharmacistRepository')

const updatePharmacistDataFields = async (pharmacistId, dataFields) => {
  const actualDataFields = await getPharmacistDataFields(pharmacistId)
  await checkCommonDataFields(actualDataFields, dataFields)
  await checkNicDataField(actualDataFields, dataFields)
  await checkMatriculationDataField(actualDataFields, dataFields)
  const hasErrors = Object.keys(dataFields).some(key => !!dataFields[key].error)
  if (!hasErrors) {
    const pharmacistData = getPharmacistDataFromFields(actualDataFields, dataFields)
    if (Object.keys(pharmacistData).length) {
      await PharmacistRepository.update(pharmacistId, pharmacistData)
    }
  }
  return { hasErrors, fields: dataFields }
}

module.exports = { updatePharmacistDataFields }