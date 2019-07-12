const moment = require('moment')
const jwt = require('jsonwebtoken')
const { userTypes, authenticationTypes, authorizationActionTypes } = require('../permissions/identifiedUser')

const authenticationMap = {
  [userTypes.AFFILIATE]: {
    loginTTL: 30
  },
  [userTypes.DOCTOR]: {
    loginTTL: 10
  },
  [userTypes.PHARMACIST]: {
    loginTTL: 10
  },
  [userTypes.MEDICAL_INSURANCE]: {
    loginTTL: 45
  }
}

const hashPass = 'generic_hash_password'
const privateKey = 'prescription_private_key'

const getAuthenticationObject = (userType) => {
  if (!authenticationMap[userType]) {
    throw new Error('Wrong userType given')
  }
  return authenticationMap[userType]
}

class Session {
  constructor() {
    this.hash = null
    this.token = null
    this.ttl = null
    this.createdDatetime = new Date()
    this.lastRefreshedDatetime = new Date()
  }

  refresh() {
    this.lastRefreshedDatetime = new Date()
  }

  isValid() {
    return moment(this.lastRefreshedDatetime).add(this.ttl, 'minutes').isAfter(moment())
  }

  terminate() {
    this.token = null
    this.ttl = null
    this.createdDatetime = null
    this.lastRefreshedDatetime = null
  }

  static fromUserData({ userType, id, username }) {
    const session = new Session()
    const authObject = getAuthenticationObject(userType)
    session.token = Session.getToken({ userType, id, username })
    session.hash = Session.getHash(session.token)
    session.ttl = authObject.loginTTL
    return session
  }

  static fromJson(json) {
    const session = new Session()
    session.hash = json._id || session._id
    session.token = json.token || session.token
    session.ttl = json.ttl || session.ttl
    session.createdDatetime = json.createdDatetime || session.createdDatetime
    session.lastRefreshedDatetime = json.lastRefreshedDatetime || session.lastRefreshedDatetime
    return session
  }

  static getHash(token) {
    const { userType, id } = Session.getTokenData(token)
    return jwt.sign({ userType, id }, hashPass, { noTimestamp: true })
  }

  static getToken({ userType, id, username }) {
    return jwt.sign({ userType, id, username }, privateKey)
  }

  static getTokenData(token) {
    return jwt.verify(token, privateKey)
  }

  static getHashData(hash) {
    return jwt.verify(hash, hashPass)
  }

  toUserData() {
    const { userType, id, username } = jwt.verify(this.token, privateKey)
    return { userType, id, username }
  }

  toJson() {
    return {
      _id: this.hash,
      token: this.token,
      ttl: this.ttl,
      createdDatetime: this.createdDatetime,
      lastRefreshedDatetime: this.lastRefreshedDatetime
    }
  }
}

module.exports = { Session }