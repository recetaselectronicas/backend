/* eslint-disable no-underscore-dangle */
const { userTypes, authenticationTypes, authorizationActionTypes } = require('../permissions/identifiedUser')
const { PATIENT, DOCTOR, PHARMACIST, MEDICAL_INSURANCE } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { newInvalidUsernameOrPasswordError, newNotFoundError, newSessionExpiredError } = require('../utils/errors')
const { Session } = require('../domain/session')
const { mongoClient } = require('../init/mongodb')

const authenticationMap = {
  [userTypes.AFFILIATE]: {
    tableName: PATIENT
  },
  [userTypes.DOCTOR]: {
    tableName: DOCTOR
  },
  [userTypes.PHARMACIST]: {
    tableName: PHARMACIST
  },
  [userTypes.MEDICAL_INSURANCE]: {
    tableName: MEDICAL_INSURANCE
  }
}

const getAuthenticationObject = (userType) => {
  if (!authenticationMap[userType]) {
    throw new Error('Wrong userType given')
  }
  return authenticationMap[userType]
}

const invalidUserOrPassError = 'invalid username or password'

class SessionRepository {
  constructor() {
    this.authentications = {
      [authenticationTypes.USR_PASS]: this.checkAndGetUsrPassAuthentication,
      [authenticationTypes.TWO_FACTOR]: this.checkAndGetTwoFactorAuthentication,
      [authenticationTypes.DNI]: this.checkAndGetDNIAuthentication
    }
  }

  async login(userType, username, password) {
    const entity = await this.checkAndGetUsrPassAuthentication(userType, { username, password })
    const session = Session.fromUserData({ userType, id: entity.id, username })
    await this.saveSession(session)
    return session
  }

  async logout(token) {
    const session = await this.validateAndGetSession({ token })
    session.terminate()
    await this.saveSession(session)
  }

  async validateAndGetSession({ token, refresh }) {
    const session = await this.loadSession(token)
    if (!session.isValid()) {
      throw newSessionExpiredError()
    }
    if (refresh) {
      session.refresh()
      await this.saveSession(session)
    }
    return session
  }

  async saveSession(session) {
    const { ops } = await mongoClient.sessionsCollection.replaceOne({ _id: session.hash }, session.toJson(), { upsert: true })
    const savedSession = ops[0]
    if (!savedSession || !savedSession._id) {
      throw new Error('Error while saving token')
    }
  }

  async loadSession(token) {
    const hash = Session.getHash(token)
    const session = await mongoClient.sessionsCollection.findOne({ _id: hash })
    if (!session) {
      throw newNotFoundError('Session not found')
    }
    return Session.fromJson(session)
  }

  async checkAndGetAuthentication(authenticationType, userType, data) {
    if (!this.authentications[authenticationType]) {
      throw new Error('Wrong authenticationType given')
    }
    return this.authentications[authenticationType](userType, data)
  }

  async checkAndGetUsrPassAuthentication(userType, data) {
    const authenticationObject = getAuthenticationObject(userType)
    const { username, password } = data
    if (!username || !password) {
      throw newInvalidUsernameOrPasswordError(invalidUserOrPassError)
    }
    const entity = await knex
      .select()
      .from(authenticationObject.tableName)
      .where(`${authenticationObject.tableName}.user_name`, username)
      .andWhere(`${authenticationObject.tableName}.password`, password)
      .first()

    if (!entity) {
      throw newInvalidUsernameOrPasswordError(invalidUserOrPassError)
    }
    return entity
  }

  checkAndGetTwoFactorAuthentication(userType, data) {

  }

  checkAndGetDNIAuthentication(userType, data) {

  }
}

module.exports = { SessionRepository: new SessionRepository() }