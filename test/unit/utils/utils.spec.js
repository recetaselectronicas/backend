const utils = require('../../../src/utils/utils')

test('logger exists', () => {
  expect(utils.logger).toBe(utils.logger)
})

test('date formats exists and are strings', () => {
  expect(utils.formats).toHaveProperty('dateTimeFormat')
  expect(utils.formats).toHaveProperty('dateFormat')
  expect(utils.formats).toHaveProperty('timeFormat')
  expect(typeof utils.formats.dateTimeFormat).toBe('string')
  expect(typeof utils.formats.dateFormat).toBe('string')
  expect(typeof utils.formats.timeFormat).toBe('string')
})
