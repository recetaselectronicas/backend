const { getIdentifiedUserBy } = require('../permissions/identifiedUser')
const { newForbiddenResourceException } = require('../utils/errors')
const { SessionRepository } = require('../repositories/sessionRepository')

module.exports = async (req, res, next) => {
  const { token } = req
  try {
    if (!token) {
      throw newForbiddenResourceException()
    }
    const session = await SessionRepository.validateAndGetSession({ token, refresh: true })
    const userData = session.toUserData()
    const identifiedUser = getIdentifiedUserBy(userData.userType, Number.parseInt(userData.id, 10), userData.username)
    req.identifiedUser = identifiedUser

    return next()
  } catch (error) {
    return next(newForbiddenResourceException(null, error))
  }
}
