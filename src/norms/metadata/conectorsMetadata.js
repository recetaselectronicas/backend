const { IsConector } = require('../conectors/isConector')
const { NotConector } = require('../conectors/notConector')
const { AndConector } = require('../conectors/andConector')
const { OrConector } = require('../conectors/orConector')
const { ImplConector } = require('../conectors/implConector')
const { DoubleImplConector } = require('../conectors/doubleImpleConector')
const { loadPredicate, loadPredicates, loadAntecedentAndConsequent } = require('./metadata')

const CONECTOR_METADATA = {
  loadPredicate: json => CONECTOR_METADATA[json.name](json),
  IS: json => new IsConector().initialize({ ...json, predicate: loadPredicate(json) }),
  NOT: json => new NotConector().initialize({ ...json, predicate: loadPredicate(json) }),
  OR: json => new OrConector().initialize({ ...json, predicates: loadPredicates(json) }),
  AND: json => new AndConector().initialize({ ...json, predicates: loadPredicates(json) }),
  IMPL: json => new ImplConector().initialize({ ...json, ...loadAntecedentAndConsequent(json) }),
  DOUBLE_IMPL: json => new DoubleImplConector().initialize({ ...json, ...loadAntecedentAndConsequent(json) })
}

module.exports = { CONECTOR_METADATA }