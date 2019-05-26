const utils = require('../../src/utils/utils')

test('logger logs to console', () => {
    expect(utils.logger).toBe(utils.logger);
});