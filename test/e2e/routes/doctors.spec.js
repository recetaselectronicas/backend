const request = require('supertest')
const { init } = require('../../../src/init/initServer')
const { MedicalInsuranceRepository } = require('../../../src/repositories/medicalInsuranceRepository')
const { MedicalInsurance } = require('../../../src/domain/medicalInsurance')

const app = init()
app.locals.logger = { info: () => {}, error: () => {} }

describe('when do a get in /medical-insurances', () => {
  describe('and the repository response ok', () => {
    const medicalInsurancesValue = [
      MedicalInsurance.fromObject({
        id: 0,
        description: 'OSDE'
      }),
      MedicalInsurance.fromObject({
        id: 1,
        description: 'SWISS MEDICAL'
      })
    ]

    beforeAll(() => {
      MedicalInsuranceRepository.getAll = () => medicalInsurancesValue
    })

    it('return all avaiables the medicalInsurances', () => request(app)
      .get('/medical-insurances')
      .set('Authorization', 'Bearer {"type":"affiliate", "id": "1"}')
      .expect(200)
      .then((res) => {
        const firstMedicalInsurance = res.body[0]
        expect(firstMedicalInsurance).toHaveProperty('id')
        expect(firstMedicalInsurance).toHaveProperty('description')
        expect(res.body).toEqual(medicalInsurancesValue)
      }))
  })

  describe('and the repository fails on search', () => {
    beforeAll(() => {
      MedicalInsuranceRepository.getAll = () => {
        throw {}
      }
    })

    it('respond with 500 ', () => request(app)
      .get('/medical-insurances')
      .set('Authorization', 'Bearer {"type":"affiliate", "id": "1"}')
      .expect(500))
  })
})

describe('when do a get at /ping', () => {
  it('respond pong', () => request(app)
    .get('/ping')
    .expect(200)
    .then((res) => {
      expect(res.body.message).toEqual('pong')
    }))
})

describe('when do a get in /doctors/{id}/medical-insurances', () => {
  const doctorId = 1
  describe('and the repository response ok', () => {
    const medicalInsurancesValue = [
      MedicalInsurance.fromObject({
        id: 0,
        description: 'OSDE'
      }),
      MedicalInsurance.fromObject({
        id: 1,
        description: 'SWISS MEDICAL'
      })
    ]

    beforeAll(() => {
      MedicalInsuranceRepository.getMedicalInsuranceByMedic = () => medicalInsurancesValue
    })

    it('return all avaiables the medicalInsurances for this medic', () => request(app)
      .get(`/doctors/${doctorId}/medical-insurances`)
      .set('Authorization', 'Bearer {"type":"affiliate", "id": "1"}')
      .expect(200)
      .then((res) => {
        const firstMedicalInsurance = res.body[0]
        expect(firstMedicalInsurance).toHaveProperty('id')
        expect(firstMedicalInsurance).toHaveProperty('description')
        expect(res.body).toEqual(medicalInsurancesValue)
      }))
  })

  describe('and the repository fails on search', () => {
    beforeAll(() => {
      MedicalInsuranceRepository.getMedicalInsuranceByMedic = () => {
        throw {}
      }
    })

    it('respond with 500 ', () => request(app)
      .get(`/doctors/${doctorId}/medical-insurances`)
      .expect(500))
  })
})
