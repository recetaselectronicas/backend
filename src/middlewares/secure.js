const { getIdentifiedUserBy } = require('../permissions/identifiedUser')
const { newForbiddenResourceException } = require('../utils/errors')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    throw newForbiddenResourceException()
  }
  const { id, type } = JSON.parse(authorization.split('Bearer ')[1])
  const identifiedUser = getIdentifiedUserBy(type, Number.parseInt(id, 10))
  req.identifiedUser = identifiedUser

  return next()
}
