const { DoctorRepository } = require('../../../repositories/doctorRepository')
const { MedicalBookletRepository } = require('../../../repositories/medicalBookletRepository')
const { getNewSimpleDataField } = require('../getNewSimpleDataField')
const { getNewMultiDataField } = require('../getNewMultiDataField')
const { getValidNicTypes } = require('../../validations/getValidNicTypes')
const { getValidGenders } = require('../../validations/getValidGenders')
const { getValidSpecialties } = require('../../validations/getValidSpecialties')
const { getValidNationalities } = require('../../validations/getValidNationalities')
const { getDefaultProfileImage } = require('../getDefaultProfileImage')


const getDoctorDataFields = async (doctorId) => {
  const doctor = await DoctorRepository.getById(doctorId)
  const hasOrHadLinkUp = await MedicalBookletRepository.hasOrHadAnyLinkUp(doctorId)
  const dataFields = {
    name: getNewSimpleDataField('name', 'Nombre', doctor.name, !hasOrHadLinkUp),
    lastName: getNewSimpleDataField('lastName', 'Apellido', doctor.lastName, !hasOrHadLinkUp),
    userName: getNewSimpleDataField('userName', 'Usuario', doctor.userName, false),
    birthDate: getNewSimpleDataField('birthDate', 'Fecha de Nacimiento', doctor.getBirthDate(), !hasOrHadLinkUp),
    gender: getNewMultiDataField('gender', 'Sexo', doctor.gender, getValidGenders(), !hasOrHadLinkUp),
    contactNumber: getNewSimpleDataField('contactNumber', 'Número de Contacto', doctor.contactNumber),
    email: getNewSimpleDataField('email', 'Dirección de Email', doctor.email),
    address: getNewSimpleDataField('address', 'Domicilio', doctor.address),
    nationality: getNewMultiDataField('nationality', 'Nacionalidad', doctor.nationality, getValidNationalities(), !hasOrHadLinkUp),
    nationalMatriculation: getNewSimpleDataField('nationalMatriculation', 'Matrícula Nacional', doctor.nationalMatriculation, !hasOrHadLinkUp),
    provincialMatriculation: getNewSimpleDataField('provincialMatriculation', 'Matrícula Provincial', doctor.provincialMatriculation, !hasOrHadLinkUp),
    specialty: getNewMultiDataField('specialty', 'Especialidad', doctor.specialty && doctor.specialty.id, getValidSpecialties(), !hasOrHadLinkUp),
    nicType: getNewMultiDataField('nicType', 'Tipo de Documento', doctor.nicType, getValidNicTypes(), !hasOrHadLinkUp),
    nicNumber: getNewSimpleDataField('nicNumber', 'Número de Documento', doctor.nicNumber, !hasOrHadLinkUp),
    nicPhoto: getNewSimpleDataField('nicPhoto', 'Foto del Documento', doctor.nicPhoto, !hasOrHadLinkUp, false),
    profileImage: getNewSimpleDataField('profileImage', 'Imagen de Perfil', doctor.profileImage || getDefaultProfileImage(), true, false),
  }
  return dataFields
}

module.exports = { getDoctorDataFields }