const request = require('supertest')
const { init } = require('../../../src/init/initServer')
const { MedicalInsuranceRepository } = require('../../../src/repositories/medicalInsuranceRepository')
const { MedicalInsurance } = require('../../../src/domain/medicalInsurance')
const permissions = require('../../../src/permissions/identifiedUser')

const app = init()
app.locals.logger = { info: () => {}, error: () => {} }
// app.req.identifiedUser = permissions.getIdentifiedAffiliate(1)

describe.only('when do a get in /prescriptions', () => {
  const filtersValue = {
    id: {
      key: 'id',
    },
    status: {
      key: 'status',
      values: [
        {
          id: 'CONFIRMED',
          value: 'CONFIRMADA',
        },
        {
          id: 'EXPIRED',
          value: 'VENCIDA',
        },
        {
          id: 'RECEIVED',
          value: 'RECEPCIONADA',
        },
        {
          id: 'PARTIALLY_RECEIVED',
          value: 'PARCIALMENTE_RECEPCIONADA',
        },
      ],
    },
    issueDateRange: {
      keyFrom: 'fromIssueDate',
      keyTo: 'toIssueDate',
      format: 'DD/MM/YYYY HH:mm',
    },
    soldDateRange: {
      keyFrom: 'fromSoldDate',
      keyTo: 'toSoldDate',
      format: 'DD/MM/YYYY HH:mm',
    },
    institution: {
      key: 'institution',
      values: [],
    },
    medicalInsurance: {
      key: 'medicalInsurance',
      values: [],
    },
    medicine: {
      key: 'medicine',
    },
  }
  const ordersValue = {
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
    },
  }
  it('respond with correct filters', () => request(app)
    .get('/prescriptions')
    .expect(200)
    .then((res) => {
      expect(res.body.filters).toEqual(filtersValue)
      expect(res.body.orders).toEqual(ordersValue)
    }))
})
/*

{
  "filters": {
    "singles": {
      "id": {
        "key": "id"
      },
      "status": {
        "key": "status",
        "values": [
          {
            "id": "RECEIVED",
            "value": "RECEPCIONADA"
          },
          {
            "id": "PARTIALLY_RECEIVED",
            "value": "PARCIALMENTE_RECEPCIONADA"
          },
          {
            "id": "INCOMPLETE",
            "value": "INCOMPLETA"
          },
          {
            "id": "AUDITED",
            "value": "AUDITADA"
          },
          {
            "id": "REJECTED",
            "value": "RECHAZADA"
          },
          {
            "id": "PARTIALLY_REJECTED",
            "value": "PARCIALMENTE_RECHAZADA"
          }
        ]
      }
    },
    "ranges": {
      "issueDateRange": {
        "keyFrom": "fromIssueDate",
        "keyTo": "toIssueDate",
        "format": "DD/MM/YYYY HH:mm"
      },
      "soldDateRange": {
        "keyFrom": "fromSoldDate",
        "keyTo": "toSoldDate",
        "format": "DD/MM/YYYY HH:mm"
      }
    }
  },
  "specialFilters": {
    "singles": {
      "institution": {
        "key": "institution",
        "values": [
          {
            "id": 0,
            "value": "Corporacion medica"
          },
          {
            "id": 1,
            "value": "Italiano"
          },
          {
            "id": 2,
            "value": "Anchorena"
          }
        ]
      },
      "medicalInsurance": {
        "key": "medicalInsurance",
        "values": [
          {
            "id": 0,
            "value": "OSDE"
          },
          {
            "id": 1,
            "value": "Swiss Medical"
          },
          {
            "id": 2,
            "value": "OSECAD"
          }
        ]
      },
      "medicine": {
        "key": "medicine"
      }
    },
    "ranges": {}
  },
  "orders": {
    "key": "orderBy",
    "values": {
      "id": {
        "key": "id",
        "sorting": {
          "asc": "asc"
        }
      },
      "issuedDate": {
        "key": "issuedDate",
        "sorting": {
          "asc": "asc",
          "dsc": "desc"
        }
      },
      "soldDate": {
        "key": "soldDate",
        "sorting": {
          "asc": "asc",
          "dsc": "desc"
        }
      }
    }
  }
}
*/
