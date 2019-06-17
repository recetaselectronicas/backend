const { Rule } = require('../rules/rule')
const { loadPredicate } = require('./metadata')

console.log(loadPredicate)

const RULE_METADATA = json => new Rule().initialize({
  ...json,
  predicate: loadPredicate(json)
})

module.exports = { RULE_METADATA }