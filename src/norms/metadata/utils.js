
const getFunctions = types => ({
  loadPredicates(json) {
    if (json.predicates) {
      return json.predicates.map(predicate => types[predicate.type].loadPredicate(predicate))
    }
    if (json.states) {
      return json.states.map(state => types[state.type].loadPredicate(state))
    }
    if (json.rules) {
      return json.rules.map(rule => types[rule.type].loadPredicate(rule))
    }
    return null
  },
  loadPredicate(json) {
    if (json.predicate) {
      return types[json.predicate.type].loadPredicate(json.predicate)
    }
    if (json.predicates) {
      return this.loadPredicates(json)
    }
    return null
  },
  loadAntecedentAndConsequent(json) {
    const model = {
      antecedent: null,
      consequent: null
    }
    if (json.antecedent) {
      model.antecedent = types[json.antecedent.type].loadPredicate(json.antecedent)
    } else {
      delete model.antecedent
    }
    if (json.consequent) {
      model.consequent = types[json.consequent.type].loadPredicate(json.consequent)
    } else {
      delete model.consequent
    }
    return model
  }
})


module.exports = { getFunctions }