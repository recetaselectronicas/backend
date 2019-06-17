const { Quantifier } = require('../../quantifiers/quantifier')
const { Criteria } = require('../criteria')

class ItemCriteria extends Criteria {
  doValidate(model) {
    super.doValidate(model)
    if (!model.quantifier || !(model.quantifier instanceof Quantifier)) {
      throw new Error('Error while assembling ItemCriteria. No quantifier given or not a Quantifier.')
    }
  }

  doInitialize(model) {
    super.doInitialize(model)
    this.quantifier = model.quantifier
    this.quantifier.initialize(this.getQuantifierModel(model))
  }

  getQuantifierModel(model) {
    return {
      ...model,
      predicates: this.prescription.items.map((item, index) => ({
        satisfies: () => {
          this.operator.loadAttributeValue(this.getAttributeValue(index))
          return this.operator.satisfies()
        }
      }))
    }
  }

  satisfies() {
    return this.quantifier.satisfies()
  }

  toJson() {
    return {
      ...super.toJson(),
      ...this.quantifier.toJson()
    }
  }
}

module.exports = { ItemCriteria }