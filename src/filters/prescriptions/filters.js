const { formats } = require('../../utils/utils')
const array = require('lodash/array')


const getMatchingValues = function (key,values) {
  return array.intersection(this.values.map(({ id }) => id), values)
}
module.exports = {
  singles: {
    id: {
      key: 'id',
    },
    status: {
      key: 'status',
      values: [],
      getMatchingValues,
    },
    institution: {
      key: 'institution',
      values: [],
      getMatchingValues,
    },
    medicalInsurance: {
      key: 'medicalInsurance',
      values: [],
      getMatchingValues,
    },
    affiliate: {
      key: 'affiliate',
      getMatchingValues: (key,id) => id
    },
    doctor: {
      key: 'doctor',
      getMatchingValues: (key,id) => id

    },
    pharmacist: {
      key: 'pharmacist',
      getMatchingValues: (key,id) => id

    },
    medicine: {
      key: 'medicine',
      getMatchingValues: (key,id) => id

    },
  },
  ranges: {
    issueDateRange: {
      keyFrom: 'fromIssueDate',
      keyTo: 'toIssueDate',
      getMatchingValues: function (key,value){
        console.log("issueDateRange")
        console.log(this, value)  },
      format: formats.dateTimeFormat,
    },
    soldDateRange: {
      keyFrom: 'fromSoldDate',
      keyTo: 'toSoldDate',
      format: formats.dateTimeFormat,
    },
    auditedDateRange: {
      keyFrom: 'fromAuditedDate',
      keyTo: 'toAuditedDate',
      format: formats.dateTimeFormat,
    },
  },
  orders: {
    key: 'orderBy',
    values: {
      id: {
        key: 'id',
        sorting: {
          asc: 'asc',
        },
      },
      issuedDate: {
        key: 'issuedDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc',
        },
      },
      soldDate: {
        key: 'soldDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc',
        },
      },
      auditedDate: {
        key: 'audtitedDate',
        sorting: {
          asc: 'asc',
          dsc: 'desc',
        },
      },
    },
  },
}
