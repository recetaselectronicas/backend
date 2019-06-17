const { Norm } = require('../executables/norm')
const { NormState } = require('../executables/normState')
const { Rule } = require('../executables/rule')
const { loadPredicate, loadPredicates } = require('./metadata')

const EXECUTABLE_METADATA = {
  loadPredicate: json => EXECUTABLE_METADATA[json.name](json),
  getActualStatus: () => null,
  NORM: json => new Norm().initialize({ ...json, executionStatus: EXECUTABLE_METADATA.getActualStatus(), states: loadPredicates(json) }),
  NORM_STATE: json => new NormState().initialize({ ...json, rules: loadPredicates(json) }),
  RULE: json => new Rule().initialize({ ...json, predicate: loadPredicate(json) })
}

module.exports = { EXECUTABLE_METADATA }