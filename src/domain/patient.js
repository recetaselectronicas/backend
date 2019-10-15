const { dateFormat } = require('../utils/utils')

class Patient {
  constructor() {
    this.id = null
    this.name = null
    this.surname = null
    this.userName = null
    this.password = null
    this.birthDate = null
    this.gender = null
    this.contactNumber = null
    this.email = null
    this.address = null
    this.nationality = null
    this.nicNumber = null
    this.nicIssueDate = null
    this.nicType = null
    this.nicExemplary = null
    this.nicPhoto = null
    this.confirmed = null
  }

  setBirthDate(date) {
    this.birthDate = dateFormat.toDate(date)
  }

  getBirthDate() {
    return dateFormat.toString(this.birthDate)
  }

  setNicIssueDate(date) {
    this.nicIssueDate = dateFormat.toDate(date)
  }

  getNicIssueDate() {
    return dateFormat.toString(this.nicIssueDate)
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      surname: this.surname,
      userName: this.userName,
      birthDate: this.getBirthDate(),
      gender: this.gender,
      contactNumber: this.contactNumber,
      email: this.email,
      address: this.address,
      nationality: this.nationality,
      nicNumber: this.nicNumber,
      nicIssueDate: this.getNicIssueDate(),
      nicType: this.nicType,
      nicExemplary: this.nicExemplary,
      nicPhoto: this.nicPhoto,
    })
  }

  static fromJson(json = '{}') {
    if (!json) {
      return new Patient()
    }
    const object = typeof json === 'object' ? json : JSON.parse(json)
    const patient = new Patient()
    patient.id = object.id || patient.id
    patient.name = object.name || patient.name
    patient.surname = object.surname || patient.surname
    patient.userName = object.userName || patient.userName
    patient.password = object.password || patient.password
    patient.setBirthDate(object.birthDate)
    patient.gender = object.gender || patient.gender
    patient.contactNumber = object.contactNumber || patient.contactNumber
    patient.email = object.email || patient.email
    patient.address = object.address || patient.address
    patient.nationality = object.nationality || patient.nationality
    patient.nicNumber = object.nicNumber || patient.nicNumber
    patient.setNicIssueDate(object.nicIssueDate)
    patient.nicType = object.nicType || patient.nicType
    patient.nicExemplary = object.nicExemplary || patient.nicExemplary
    patient.nicPhoto = object.nicPhoto || patient.nicPhoto
    patient.confirmed = object.confirmed || patient.confirmed
    return patient
  }

  toPlainObject() {
    return JSON.parse(this.toJson())
  }

  static fromObject(object) {
    if (!(object instanceof Patient)) {
      return Patient.fromJson(object)
    }
    return object
  }
}

module.exports = { Patient }
