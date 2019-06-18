const { InstitutionCriteria } = require('./institutionCriteria')

class InstitutionDescriptionCriteria extends InstitutionCriteria {
  getAttributeValue() {
    return this.prescription.institution.description
  }

  getAttribute() {
    return 'DESCRIPTION'
  }
}

module.exports = { InstitutionDescriptionCriteria }