const jwt = require('jsonwebtoken')
const { authorizationActionTypes, userTypes, authenticationTypes } = require('../permissions/identifiedUser')
const { SessionRepository } = require('../repositories/sessionRepository')
const { newBadRequestError, isBusinessError, newForbiddenResourceException } = require('../utils/errors')

const privateKey = 'authorization_provider'

const authorizationsMap = {
  [authorizationActionTypes.ISSUE_PRESCRIPTION]: {
    ttl: 4
  },
  [authorizationActionTypes.AUTHORIZE_ISSUE_PRESCRIPTION]: {
    ttl: 2
  },
  [authorizationActionTypes.RECEIVE_PRESCRIPTION]: {
    ttl: 2
  },
  [authorizationActionTypes.AUTHORIZE_RECEIVE_PRESCRIPTION]: {
    ttl: 10
  }
}

class AuthorizationProvider {
  async issuePrescription(user, authentication, prescription) {
    if (!user.canIssue()) {
      throw newForbiddenResourceException()
    }
    const userEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.DOCTOR, authentication)
    if (userEntity.id !== user.id || user.type !== userTypes.DOCTOR) {
      throw newForbiddenResourceException('The authenticated user does`t match with the authorization requester')
    }
    const doctor = {
      id: user.id,
      username: user.username
    }
    const authorization = {
      type: authorizationActionTypes.ISSUE_PRESCRIPTION,
      doctor,
      prescription
    }
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl * 60, subject: doctor.username, audience: doctor.username })
  }

  async allowIssuePrescription(authorizerUser, authorizedUser, authentication, prescription) {
    if (authorizerUser.id !== prescription.affiliate.id) {
      throw newForbiddenResourceException('The authorizer user doesn`t match with the prescription`s affiliate')
    }
    const authorizerEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.AFFILIATE, authentication)
    if (authorizerEntity.id !== authorizerUser.id) {
      throw newForbiddenResourceException('The authorizer user doesn`t match with the authorization requester')
    }
    const affiliate = {
      id: authorizerUser.id,
      username: authorizerUser.userName
    }
    const doctor = {
      id: authorizedUser.id,
      username: authorizedUser.username
    }
    const authorization = {
      type: authorizationActionTypes.AUTHORIZE_ISSUE_PRESCRIPTION,
      affiliate,
      doctor,
      prescription
    }
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl * 60, subject: affiliate.username, audience: doctor.username })
  }

  async receivePrescription() {

  }

  async allowReceivePrescription() {

  }
}

module.exports = { AuthorizationProvider: new AuthorizationProvider() }