const { getIdentifiedUserBy } = require('../permissions/identifiedUser')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  const { id, type } = JSON.parse(authorization.split('Bearer ')[1])
  const identifiedUser = getIdentifiedUserBy(type, Number.parseInt(id, 10))
  req.identifiedUser = identifiedUser
  return next()
}
