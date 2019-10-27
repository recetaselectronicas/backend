const { dateFormat } = require('../utils/utils')

class Doctor {
  constructor() {
    this.id = null
    this.name = null
    this.lastName = null
    this.userName = null
    this.password = null
    this.birthDate = null
    this.entryDate = null
    this.leavingDate = null
    this.contactNumber = null
    this.nationality = null
    this.address = null
    this.email = null
    this.nationalMatriculation = null
    this.provincialMatriculation = null
    this.specialty = null
    this.nicNumber = null
    this.nicType = null
    this.nicPhoto = null
    this.gender = null
  }

  setBirthDate(date) {
    this.birthDate = dateFormat.toDate(date)
  }

  getBirthDate() {
    return dateFormat.toString(this.birthDate)
  }

  setEntryDate(date) {
    this.entryDate = dateFormat.toDate(date)
  }

  getEntryDate() {
    return dateFormat.toString(this.entryDate)
  }

  setLeavingDate(date) {
    this.leavingDate = dateFormat.toDate(date)
  }

  getLeavingDate() {
    return dateFormat.toString(this.leavingDate)
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      userName: this.userName,
      birthDate: this.getBirthDate(),
      entryDate: this.getEntryDate(),
      leavingDate: this.getLeavingDate(),
      contactNumber: this.contactNumber,
      nationality: this.nationality,
      address: this.address,
      email: this.email,
      nationalMatriculation: this.nationalMatriculation,
      provincialMatriculation: this.provincialMatriculation,
      specialty: this.specialty,
      nicType: this.nicType,
      nicNumber: this.nicNumber,
      gender: this.gender
    })
  }

  toPlainObject() {
    return JSON.parse(this.toJson())
  }

  static fromJson(json = '{}') {
    if (!json) {
      return new Doctor()
    }
    const object = typeof json === 'object' ? json : JSON.parse(json)
    const doctor = new Doctor()
    doctor.id = object.id || doctor.id
    doctor.setBirthDate(object.birthDate)
    doctor.setEntryDate(object.entryDate)
    doctor.setLeavingDate(object.leavingDate)
    doctor.name = object.name || doctor.name
    doctor.lastName = object.lastName || doctor.lastName
    doctor.userName = object.userName || doctor.userName
    doctor.contactNumber = object.contactNumber || doctor.contactNumber
    doctor.nationality = object.nationality || doctor.nationality
    doctor.address = object.address || doctor.address
    doctor.email = object.email || doctor.email
    doctor.nationalMatriculation = object.nationalMatriculation || doctor.nationalMatriculation
    doctor.provincialMatriculation = object.provincialMatriculation || doctor.provincialMatriculation
    doctor.specialty = object.specialty || doctor.specialty
    doctor.nicNumber = object.nicNumber || doctor.nicNumber
    doctor.nicType = object.nicType || doctor.nicType
    doctor.nicPhoto = object.nicPhoto || doctor.nicPhoto
    doctor.gender = object.gender || doctor.gender
    doctor.password = object.password || doctor.password
    return doctor
  }

  static fromObject(object) {
    if (!(object instanceof Doctor)) {
      return Doctor.fromJson(object)
    }
    return object
  }
}
module.exports = { Doctor }
