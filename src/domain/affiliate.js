const { dateFormat, dateTimeFormat } = require('../utils/utils')
const { Plan } = require('./plan')

class Affiliate {
  constructor() {
    this.id = null
    this.idPatient = null
    this.name = null
    this.surname = null
    this.userName = null
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
    this.fromDate = null
    this.toDate = null
    this.code = null
    this.category = null
    this.imageCredential = null
    this.plan = new Plan()
  }

  setFromDate(date) {
    this.fromDate = dateTimeFormat.toDate(date)
  }

  getFromDate() {
    return dateTimeFormat.toString(this.fromDate)
  }

  setToDate(date) {
    this.toDate = dateTimeFormat.toDate(date)
  }

  getToDate() {
    return dateTimeFormat.toString(this.toDate)
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
      idPatient: this.idPatient,
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
      fromDate: this.getFromDate(),
      toDate: this.getToDate(),
      code: this.code,
      category: this.category,
      imageCredential: this.imageCredential,
      plan: this.plan ? JSON.parse(this.plan.toJson()) : this.plan,
    })
  }

  toReduceJson() {
    return JSON.stringify({
      id: this.id,
      idPatient: this.idPatient,
      name: this.name,
      surname: this.surname,
      userName: this.userName,
      birthDate: this.getBirthDate(),
      gender: this.gender,
      fromDate: this.getFromDate(),
      toDate: this.getToDate(),
      code: this.code,
      category: this.category,
      nicNumber: this.nicNumber
    })
  }

  static fromJson(json = '{}') {
    if (!json) {
      return new Affiliate()
    }
    const object = typeof json === 'object' ? json : JSON.parse(json)
    const affiliate = new Affiliate()
    affiliate.id = object.id || affiliate.id
    affiliate.idPatient = object.idPatient || affiliate.idPatient
    affiliate.name = object.name || affiliate.name
    affiliate.surname = object.surname || affiliate.surname
    affiliate.userName = object.userName || affiliate.userName
    affiliate.setBirthDate(object.birthDate)
    affiliate.gender = object.gender || affiliate.gender
    affiliate.contactNumber = object.contactNumber || affiliate.contactNumber
    affiliate.email = object.email || affiliate.email
    affiliate.address = object.address || affiliate.address
    affiliate.nationality = object.nationality || affiliate.nationality
    affiliate.nicNumber = object.nicNumber || affiliate.nicNumber
    affiliate.setNicIssueDate(object.nicIssueDate)
    affiliate.nicType = object.nicType || affiliate.nicType
    affiliate.nicExemplary = object.nicExemplary || affiliate.nicExemplary
    affiliate.nicPhoto = object.nicPhoto || affiliate.nicPhoto
    affiliate.setFromDate(object.fromDate)
    affiliate.setToDate(object.toDate)
    affiliate.code = object.code || affiliate.code
    affiliate.category = object.category || affiliate.category
    affiliate.imageCredential = object.imageCredential || affiliate.imageCredential
    affiliate.plan = Plan.fromJson(object.plan)
    return affiliate
  }

  toPlainObject() {
    return JSON.parse(this.toJson())
  }

  toReduceObject() {
    return JSON.parse(this.toReduceJson())
  }

  static fromObject(object) {
    if (!(object instanceof Affiliate)) {
      return Affiliate.fromJson(object)
    }
    return object
  }
}

module.exports = { Affiliate }
