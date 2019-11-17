const { codes } = require('../codes/commonCodes')

const getTimeInSeconds = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => (seconds + 60 * minutes + 3600 * hours + 86400 * days)
const getTimeInMilliseconds = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => getTimeInSeconds({ days, hours, minutes, seconds }) * 1000

const defaults = {
  daemons: {
    issued: {
      name: 'Issued Daemon',
      interval: getTimeInMilliseconds({ seconds: 30 }),
      ttl: getTimeInSeconds({ minutes: 1 })
    },
    expired: {
      name: 'Expired Daemon',
      interval: getTimeInMilliseconds({ minutes: 1 }),
      ttl: getTimeInSeconds({ minutes: 5 })
    }
  },
  authorizations: {
    privateKey: `${codes.COMPANY.NAME}_authorization_module`,
    issue: {
      ttl: getTimeInSeconds({ minutes: 4 })
    },
    authorizeIssue: {
      ttl: getTimeInSeconds({ minutes: 2 })
    },
    receive: {
      ttl: getTimeInSeconds({ minutes: 2 })
    },
    authorizeReceive: {
      ttl: getTimeInSeconds({ minutes: 10 })
    },
    cancel: {
      ttl: getTimeInSeconds({ minutes: 1 })
    }
  },
  confirmations: {
    privateKey: `${codes.COMPANY.NAME}_confirmation_module`,
    url: {
      host: 'http://localhost:3000'
    },
    token: {
      ttl: getTimeInSeconds({ days: 3 })
    }
  },
  emails: {
    corporative: {
      email: 'unify.prescriptions@gmail.com',
      pass: 'unify_94825'
    }
  }
}

module.exports = { defaults }