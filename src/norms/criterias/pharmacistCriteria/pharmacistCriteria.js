/* eslint-disable no-unused-vars */
const lang = require('lodash/lang')
const array = require('lodash/array')
const { Quantifier } = require('../../quantifiers/quantifier')
const { Criteria } = require('../criteria')

class PharmacistCriteria extends Criteria {
  doValidate(model) {
    super.doValidate(model)
    if (!model.quantifier || !(model.quantifier instanceof Quantifier)) {
      throw new Error('Error while assembling PharmacistCriteria. No quantifier given or not a Quantifier.')
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
      predicates: array.compact(this.prescription.items.map((item, index) => {
        if (item.received.pharmacist.id) {
          return {
            satisfies: () => {
              this.operator.loadAttributeValue(this.getAttributeValue(index))
              return this.operator.satisfies()
            }
          }
        }
        return null
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

  getEntity() {
    return 'PHARMACIST'
  }

  getPharmacistValue(index) {
    if (lang.isNumber(index)) {
      return this.prescription.items[index].received.pharmacist
    }
    return null
  }

  getAttributeValue(index) {
    if (lang.isNumber(index)) {
      return this.doGetAttributeValue(index)
    }
    return null
  }

  doGetAttributeValue(index) {
    throw new Error('Template method. Please override!')
  }
}

module.exports = { PharmacistCriteria }