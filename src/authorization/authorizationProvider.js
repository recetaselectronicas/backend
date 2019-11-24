const jwt = require('jsonwebtoken')
const { authorizationActionTypes, userTypes } = require('../permissions/identifiedUser')
const { SessionRepository } = require('../repositories/sessionRepository')
const { newForbiddenResourceException } = require('../utils/errors')
const utils = require('./utils')
const { defaults } = require('../config/defaults')

const { privateKey } = defaults.authorizations

const authorizationsMap = {
  [authorizationActionTypes.ISSUE_PRESCRIPTION]: {
    ttl: defaults.authorizations.issue.ttl
  },
  [authorizationActionTypes.AUTHORIZE_ISSUE_PRESCRIPTION]: {
    ttl: defaults.authorizations.authorizeIssue.ttl
  },
  [authorizationActionTypes.RECEIVE_PRESCRIPTION]: {
    ttl: defaults.authorizations.receive.ttl
  },
  [authorizationActionTypes.AUTHORIZE_RECEIVE_PRESCRIPTION]: {
    ttl: defaults.authorizations.authorizeReceive.ttl
  },
  [authorizationActionTypes.CANCEL_PRESCRIPTION]: {
    ttl: defaults.authorizations.cancel.ttl
  }
}

class AuthorizationProvider {
  async issuePrescription(user, authentication, prescription) {
    if (!user.canIssue()) {
      throw newForbiddenResourceException()
    }
    const userEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.DOCTOR, authentication)
    if (userEntity.defaultAuthenticationMethod !== authentication.type) {
      throw newForbiddenResourceException('The authentication type given is not the default')
    }
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
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl, subject: utils.getDoctorSubject(doctor), audience: utils.getDoctorAudience(doctor) })
  }

  async allowIssuePrescription(authorizerUser, authorizedUser, authentication, prescription) {
    if (authorizerUser.id !== prescription.affiliate.id) {
      throw newForbiddenResourceException('The authorizer user doesn`t match with the prescription`s affiliate')
    }
    const authorizerEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.AFFILIATE, authentication)
    if (authorizerEntity.defaultAuthenticationMethod !== authentication.type) {
      throw newForbiddenResourceException('The authentication type given is not the default')
    }
    if (authorizerEntity.id !== authorizerUser.idPatient) {
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
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl, subject: utils.getAffiliateSubject(affiliate), audience: utils.getDoctorAudience(doctor) })
  }

  async receivePrescription(user, authentication, prescription) {
    if (!user.canReceive()) {
      throw newForbiddenResourceException()
    }
    const userEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.PHARMACIST, authentication)
    if (userEntity.defaultAuthenticationMethod !== authentication.type) {
      throw newForbiddenResourceException('The authentication type given is not the default')
    }
    if (userEntity.id !== user.id || user.type !== userTypes.PHARMACIST) {
      throw newForbiddenResourceException('The authenticated user does`t match with the authorization requester')
    }
    const pharmacist = {
      id: user.id,
      username: user.username
    }
    const authorization = {
      type: authorizationActionTypes.RECEIVE_PRESCRIPTION,
      pharmacist,
      prescription
    }
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl, subject: utils.getPharmacistSubject(pharmacist), audience: utils.getPharmacistAudience(pharmacist) })
  }

  async allowReceivePrescription(authorizerUser, authorizedUser, authentication, prescription) {
    const authorizerEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.AFFILIATE, authentication)
    if (authorizerEntity.defaultAuthenticationMethod !== authentication.type) {
      throw newForbiddenResourceException('The authentication type given is not the default')
    }
    if (authorizerEntity.id !== authorizerUser.id) {
      throw newForbiddenResourceException('The authorizer user doesn`t match with the authorization requester')
    }
    const affiliate = {
      id: authorizerUser.id,
      username: authorizerUser.userName
    }
    const pharmacist = {
      id: authorizedUser.id,
      username: authorizedUser.username
    }
    const authorization = {
      type: authorizationActionTypes.AUTHORIZE_RECEIVE_PRESCRIPTION,
      affiliate,
      pharmacist,
      prescription
    }
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl, subject: utils.getAffiliateSubject(affiliate), audience: utils.getPharmacistAudience(pharmacist) })
  }

  async cancelPrescription(user, authentication, prescription) {
    if (!user.canCancel()) {
      throw newForbiddenResourceException()
    }
    const userEntity = await SessionRepository.checkAndGetAuthentication(authentication.type, userTypes.DOCTOR, authentication)
    if (userEntity.defaultAuthenticationMethod !== authentication.type) {
      throw newForbiddenResourceException('The authentication type given is not the default')
    }
    if (userEntity.id !== user.id || user.type !== userTypes.DOCTOR) {
      throw newForbiddenResourceException('The authenticated user does`t match with the authorization requester')
    }
    const doctor = {
      id: user.id,
      username: user.username
    }
    const authorization = {
      type: authorizationActionTypes.CANCEL_PRESCRIPTION,
      doctor,
      prescription
    }
    return jwt.sign(authorization, privateKey, { expiresIn: authorizationsMap[authorization.type].ttl, subject: utils.getDoctorSubject(doctor), audience: utils.getDoctorAudience(doctor) })
  }
}

module.exports = { AuthorizationProvider: new AuthorizationProvider() }