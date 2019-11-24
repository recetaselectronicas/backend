const js2xmlparser = require('js2xmlparser')

const mapXMLStatistics = async (results) => {
  if (!results || !results.length) {
    return ''
  }
  return js2xmlparser.parse('prescriptionsData', results)
}

module.exports = { mapXMLStatistics }