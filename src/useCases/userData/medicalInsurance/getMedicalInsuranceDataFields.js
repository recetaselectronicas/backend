const { MedicalInsuranceRepository } = require('../../../repositories/medicalInsuranceRepository')
const { getNewSimpleDataField } = require('../getNewSimpleDataField')
const { getDefaultProfileImage } = require('../getDefaultProfileImage')

const getMedicalInsuranceDataFields = async (medicalInsuranceId) => {
  const medicalInsurance = await MedicalInsuranceRepository.getById(medicalInsuranceId)
  const dataFields = {
    userName: getNewSimpleDataField('userName', 'Usuario', medicalInsurance.userName, false),
    contactNumber: getNewSimpleDataField('contactNumber', 'Número de Contacto', medicalInsurance.contactNumber, false),
    corporateName: getNewSimpleDataField('corporateName', 'Nombre corporativo', medicalInsurance.corporateName, false),
    description: getNewSimpleDataField('description', 'Nombre Comercial', medicalInsurance.description, false),
    email: getNewSimpleDataField('email', 'Dirección de Email', medicalInsurance.email, false),
    address: getNewSimpleDataField('address', 'Domicilio', medicalInsurance.address, false),
    profileImage: getNewSimpleDataField('profileImage', 'Imagen de Perfil', medicalInsurance.profileImage || getDefaultProfileImage(), false, false),
  }
  return dataFields
}

module.exports = { getMedicalInsuranceDataFields }