const { Parser } = require('json2csv')

const mapCSVStatistics = async (results) => {
  if (!results || !results.length) {
    return ''
  }
  const fields = Object.keys(results[0])
  const json2csvParser = new Parser({ fields })
  const csv = json2csvParser.parse(results)
  return csv
}

module.exports = { mapCSVStatistics }