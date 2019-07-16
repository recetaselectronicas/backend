/* eslint-disable no-underscore-dangle */
const { userTypes, authenticationTypes, authorizationActionTypes } = require('../permissions/identifiedUser')
const { PATIENT, DOCTOR, PHARMACIST, MEDICAL_INSURANCE } = require('./tablesNames')
const knex = require('../init/knexConnection')
const { newInvalidUsernameOrPasswordError, newNotFoundError, newSessionExpiredError, newBadRequestError } = require('../utils/errors')
const { Session } = require('../domain/session')
const { mongoClient } = require('../init/mongodb')
const speakeasy = require('speakeasy')

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
const ivalidTokenError = 'invalid token'

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

  async checkAndGetTwoFactorAuthentication(userType, { id, code }, verify) {
    const authenticationObject = getAuthenticationObject(userType)
    const entity = await knex
      .select()
      .from(authenticationObject.tableName)
      .where(`${authenticationObject.tableName}.id`, id)
      .first()

    if (!entity) {
      throw newInvalidUsernameOrPasswordError(ivalidTokenError)
    }
    const { twoFactorKey } = entity // 'GRMC6JTBO5TVGLCFKJEEQR3EFRDDO6SQPBSGKV3VJFOXKP2MERGQ'
    const verfified = speakeasy.totp.verify({
      secret: twoFactorKey,
      encoding: 'base32',
      token: code
    })
    if (!verfified) {
      throw newInvalidUsernameOrPasswordError(ivalidTokenError)
    }
    if (verify) {
      const result = await knex
        .table(authenticationObject.tableName)
        .update({
          two_factor_verified: true
        })
        .where({
          id
        })
    } else if (!entity.twoFactorVerified) {
      throw newInvalidUsernameOrPasswordError('You haven`t verify two factor authentication.')
    }
    return entity
  }

  async checkAndGetDNIAuthentication(userType, data) {

  }

  async generateAndGetTwoFactorSecret(userType, { username, id }) {
    const authenticationObject = getAuthenticationObject(userType)
    const secret = speakeasy.generateSecret({ name: `Unify (${username})` })
    const result = await knex
      .table(authenticationObject.tableName)
      .update({
        two_factor_key: secret.base32,
        two_factor_verified: false
      })
      .where({
        user_name: username
      })
    if (result !== 1) {
      throw new Error('Error while storing two factor key')
    }
    await this.updateUserConfiguration(userType, id, { userPass: { isDefault: true } })
    return secret
  }

  async getUserConfiguration(userType, id) {
    const authenticationObject = getAuthenticationObject(userType)
    const entity = await knex
      .select()
      .from(authenticationObject.tableName)
      .where({
        id
      })
      .first()

    if (!entity) {
      throw newNotFoundError('User not found')
    }
    const userPass = {
      verified: true,
      username: entity.userName,
      isDefault: entity.defaultAuthenticationMethod === authenticationTypes.USR_PASS
    }
    const twoFactor = {
      keyGenerated: !!entity.twoFactorKey,
      verified: entity.twoFactorVerified,
      isDefault: entity.defaultAuthenticationMethod === authenticationTypes.TWO_FACTOR // TODO: Agregar el defaultAuthenticationMethod a la base y crear un endpoint para setear el default
    }
    const dniPhoto = {
      verified: !!entity.nicData,
      dataGenerated: !!entity.nicData,
      isDefault: entity.defaultAuthenticationMethod === authenticationTypes.DNI
    }
    const authentication = {
      userPass,
      twoFactor
    }
    if (userType === userTypes.AFFILIATE) {
      authentication.dniPhoto = dniPhoto
    }
    return authentication
  }

  async updateUserConfiguration(userType, id, data) {
    const authenticationObject = getAuthenticationObject(userType)
    const userConfiguration = await this.getUserConfiguration(userType, id)

    let newDefault = null
    if (data.userPass) {
      if (data.userPass.isDefault) {
        if (!userConfiguration.userPass.verified) {
          throw newBadRequestError('Authentication method is not verified')
        }
        newDefault = authenticationTypes.USR_PASS
      }
    } else if (data.twoFactor) {
      if (data.twoFactor.isDefault) {
        if (!userConfiguration.twoFactor.verified) {
          throw newBadRequestError('Authentication method is not verified')
        }
        newDefault = authenticationTypes.TWO_FACTOR
      }
    } else if (data.dniPhoto) {
      if (data.dniPhoto.isDefault) {
        if (userConfiguration.dniPhoto && !userConfiguration.dniPhoto.verified) {
          throw newBadRequestError('Authentication method is not verified')
        }
        newDefault = authenticationTypes.DNI
      }
    }
    if (userType !== userTypes.AFFILIATE && newDefault === authenticationTypes.DNI) {
      throw newBadRequestError('Wrong default authentication method')
    }
    if (newDefault === null) {
      throw newBadRequestError('Wrong default authentication method')
    }
    await knex
      .table(authenticationObject.tableName)
      .update({
        default_authentication_method: newDefault
      })
      .where({
        id
      })
  }

  async updatePassword(userType, { username, id }, data) {
    const authenticationObject = getAuthenticationObject(userType)
    const { newPassword } = data

    if (!newPassword || newPassword.length < 6) {
      throw newBadRequestError('Password must have at least 6 characters')
    }
    await knex
      .table(authenticationObject.tableName)
      .update({
        password: newPassword
      })
      .where({
        id
      })
  }
}

module.exports = { SessionRepository: new SessionRepository() }