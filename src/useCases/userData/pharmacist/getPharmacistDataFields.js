const { PharmacistRepository } = require('../../../repositories/pharmacistRepository')
const { ReceptionRepository } = require('../../../repositories/receptionRepository')
const { getNewSimpleDataField } = require('../getNewSimpleDataField')
const { getNewMultiDataField } = require('../getNewMultiDataField')
const { getValidNicTypes } = require('../../validations/getValidNicTypes')
const { getValidGenders } = require('../../validations/getValidGenders')
const { getValidNationalities } = require('../../validations/getValidNationalities')
const { getDefaultProfileImage } = require('../getDefaultProfileImage')


const getPharmacistDataFields = async (pharmacistId) => {
  const pharmacist = await PharmacistRepository.getById(pharmacistId)
  const hasOrHadLinkUp = await ReceptionRepository.hasOrHadAnyLinkUp(pharmacistId)
  const dataFields = {
    name: getNewSimpleDataField('name', 'Nombre', pharmacist.name, !hasOrHadLinkUp),
    lastName: getNewSimpleDataField('lastName', 'Apellido', pharmacist.lastName, !hasOrHadLinkUp),
    userName: getNewSimpleDataField('userName', 'Usuario', pharmacist.userName, false),
    birthDate: getNewSimpleDataField('birthDate', 'Fecha de Nacimiento', pharmacist.getBirthDate(), !hasOrHadLinkUp),
    gender: getNewMultiDataField('gender', 'Sexo', pharmacist.gender, getValidGenders(), !hasOrHadLinkUp),
    contactNumber: getNewSimpleDataField('contactNumber', 'Número de Contacto', pharmacist.contactNumber),
    email: getNewSimpleDataField('email', 'Dirección de Email', pharmacist.email),
    address: getNewSimpleDataField('address', 'Domicilio', pharmacist.address),
    nationality: getNewMultiDataField('nationality', 'Nacionalidad', pharmacist.nationality, getValidNationalities(), !hasOrHadLinkUp),
    matriculation: getNewSimpleDataField('matriculation', 'Matrícula', pharmacist.matriculation, !hasOrHadLinkUp),
    nicType: getNewMultiDataField('nicType', 'Tipo de Documento', pharmacist.nicType, getValidNicTypes(), !hasOrHadLinkUp),
    nicNumber: getNewSimpleDataField('nicNumber', 'Número de Documento', pharmacist.nicNumber, !hasOrHadLinkUp),
    nicPhoto: getNewSimpleDataField('nicPhoto', 'Foto del Documento', pharmacist.nicPhoto, !hasOrHadLinkUp, false),
    profileImage: getNewSimpleDataField('profileImage', 'Imagen de Perfil', pharmacist.profileImage || getDefaultProfileImage(), true, false),
  }
  return dataFields
}

module.exports = { getPharmacistDataFields }