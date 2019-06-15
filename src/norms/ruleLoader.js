const { types } = require('./metadata')

class RuleLoader {
  static fromJson(_json) {
    const json = _json instanceof Object ? _json : JSON.parse(_json)
    if (!json || !(json instanceof Object)) {
      throw new Error('Error while assembling predicate tree. No json given or not an Object')
    }
    if (!json.type || !types[json.type]) {
      throw new Error('Error while assembling predicate tree. No type given or not a valid Type.')
    }
    types[json.type].getClass(json).fromJson(json)
  }
}

module.exports = { RuleLoader }