const { PatientRepository } = require('../../../repositories/patientRepository')
const { AffiliateRepository } = require('../../../repositories/affiliateRepository')
const { getNewSimpleDataField } = require('../getNewSimpleDataField')
const { getNewMultiDataField } = require('../getNewMultiDataField')
const { getValidNicTypes } = require('../../validations/getValidNicTypes')
const { getValidGenders } = require('../../validations/getValidGenders')
const { getValidNationalities } = require('../../validations/getValidNationalities')
const { getDefaultProfileImage } = require('../getDefaultProfileImage')

const getPatientDataFields = async (patientId) => {
  const patient = await PatientRepository.getById(patientId)
  const hasOrHadAffiliations = await AffiliateRepository.hasOrHadAnyAffiliation(patientId)
  const dataFields = {
    name: getNewSimpleDataField('name', 'Nombre', patient.name, !hasOrHadAffiliations),
    surname: getNewSimpleDataField('surname', 'Apellido', patient.surname, !hasOrHadAffiliations),
    userName: getNewSimpleDataField('userName', 'Usuario', patient.userName, false),
    birthDate: getNewSimpleDataField('birthDate', 'Fecha de Nacimiento', patient.getBirthDate(), !hasOrHadAffiliations),
    gender: getNewMultiDataField('gender', 'Sexo', patient.gender, getValidGenders(), !hasOrHadAffiliations),
    contactNumber: getNewSimpleDataField('contactNumber', 'Número de Contacto', patient.contactNumber),
    email: getNewSimpleDataField('email', 'Dirección de Email', patient.email),
    address: getNewSimpleDataField('address', 'Domicilio', patient.address),
    nationality: getNewMultiDataField('nationality', 'Nacionalidad', patient.nationality, getValidNationalities(), !hasOrHadAffiliations),
    nicType: getNewMultiDataField('nicType', 'Tipo de Documento', patient.nicType, getValidNicTypes(), !hasOrHadAffiliations),
    nicNumber: getNewSimpleDataField('nicNumber', 'Número de Documento', patient.nicNumber, !hasOrHadAffiliations),
    nicPhoto: getNewSimpleDataField('nicPhoto', 'Foto del Documento', patient.nicPhoto, !hasOrHadAffiliations, false),
    profileImage: getNewSimpleDataField('profileImage', 'Imagen de Perfil', patient.profileImage || getDefaultProfileImage(), true, false),
  }
  return dataFields
}

module.exports = { getPatientDataFields }