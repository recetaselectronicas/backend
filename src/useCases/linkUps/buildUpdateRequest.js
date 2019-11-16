// eslint-disable-next-line import/prefer-default-export
const buildUpdateRequest = body => ({ status: body.status, reason: body.reason })
module.exports = { buildUpdateRequest }