const { IsConector } = require('../conectors/isConector')
const { NotConector } = require('../conectors/notConector')
const { AndConector } = require('../conectors/andConector')
const { loadPredicate, loadPredicates } = require('./metadata')

const CONECTOR_METADATA = {
  loadPredicate: json => CONECTOR_METADATA[json.name](json),
  IS: json => new IsConector().initialize({ ...json, predicate: loadPredicate(json) }),
  NOT: json => new NotConector().initialize({ ...json, predicate: loadPredicate(json) }),
  OR: {},
  AND: json => new AndConector().initialize({ ...json, predicates: loadPredicates(json) }),
  IMPL: {},
  DOUBLE_IMPL: {}
}

module.exports = { CONECTOR_METADATA }