const { dateFormat } = require('../utils/utils')

class Pharmacist {
  constructor() {
    this.id = null
    this.name = null
    this.lastName = null
    this.userName = null
    this.birthDate = null
    this.entryDate = null
    this.leavingDate = null
    this.contactNumber = null
    this.nationality = null
    this.address = null
    this.email = null
    this.matriculation = null
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
      matriculation: this.matriculation,
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
      return new Pharmacist()
    }
    const object = typeof json === 'object' ? json : JSON.parse(json)
    const pharmacist = new Pharmacist()
    pharmacist.id = object.id || pharmacist.id
    pharmacist.setBirthDate(object.birthDate)
    pharmacist.setEntryDate(object.entryDate)
    pharmacist.setLeavingDate(object.leavingDate)
    pharmacist.name = object.name || pharmacist.name
    pharmacist.lastName = object.lastName || pharmacist.lastName
    pharmacist.userName = object.userName || pharmacist.userName
    pharmacist.contactNumber = object.contactNumber || pharmacist.contactNumber
    pharmacist.nationality = object.nationality || pharmacist.nationality
    pharmacist.address = object.address || pharmacist.address
    pharmacist.email = object.email || pharmacist.email
    pharmacist.matriculation = object.matriculation || pharmacist.matriculation
    pharmacist.nicNumber = object.nicNumber || pharmacist.nicNumber
    pharmacist.nicType = object.nicType || pharmacist.nicType
    pharmacist.nicPhoto = object.nicPhoto || pharmacist.nicPhoto
    pharmacist.gender = object.gender || pharmacist.gender
    pharmacist.password = object.password || pharmacist.password
    return pharmacist
  }

  static fromObject(object) {
    if (!(object instanceof Pharmacist)) {
      return Pharmacist.fromJson(object)
    }
    return object
  }
}
module.exports = { Pharmacist }
