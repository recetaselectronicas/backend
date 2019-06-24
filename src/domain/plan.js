const { dateFormat } = require('../utils/utils')

class Plan {
  constructor() {
    this.id = null
    this.description = null
    this.entryDate = null
    this.leavingDate = null
    this.percentage = null
    this.idMedicalInsurance = null
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
      description: this.description,
      entryDate: this.getEntryDate(),
      leavingDate: this.getLeavingDate(),
      percentage: this.percentage,
      idMedicalInsurance: this.idMedicalInsurance,
    })
  }

  toPlainObject() {
    return JSON.parse(this.toJson())
  }

  static fromJson(json = '{}') {
    const object = typeof json === 'object' ? json : JSON.parse(json)
    const plan = new Plan()
    plan.id = object.id || plan.id
    plan.description = object.description || plan.description
    plan.setEntryDate(object.entryDate)
    plan.setLeavingDate(object.leavingDate)
    plan.percentage = object.percentage || plan.percentage
    plan.idMedicalInsurance = object.idMedicalInsurance || plan.idMedicalInsurance
    return plan
  }

  static fromObject(object) {
    if (!(object instanceof Plan)) {
      return Plan.fromJson(object)
    }
    return object
  }
}
module.exports = { Plan }
