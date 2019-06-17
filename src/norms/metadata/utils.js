
const getFunctions = types => ({
  loadPredicates(json) {
    if (json.predicates) {
      return json.predicates.map(predicate => types[predicate.type].loadPredicate(predicate))
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
  }
})


module.exports = { getFunctions }