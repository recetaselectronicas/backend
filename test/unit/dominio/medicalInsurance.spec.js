const { MedicalInsurance } = require('../../../src/domain/medicalInsurance')

const id = 45
const description = 'Osde'
const userName = 'osdeMedicalGroup'
const corporateName = 'Osde Medical Group'
const email = 'osde@medicalGroup.com'
const address = 'Evergreen 742'
const contactNumber = 5553226

const testerMedicalInsurance = {
  id, description, userName, corporateName, email, address, contactNumber,
}

describe('MedicalInsurance', () => {
  let medicalInsurance = new MedicalInsurance()

  beforeEach(() => {
    medicalInsurance = new MedicalInsurance()
  })

  it('has all this properties', () => {
    expect(medicalInsurance).toHaveProperty('id')
    expect(medicalInsurance).toHaveProperty('description')
    expect(medicalInsurance).toHaveProperty('userName')
    expect(medicalInsurance).toHaveProperty('corporateName')
    expect(medicalInsurance).toHaveProperty('email')
    expect(medicalInsurance).toHaveProperty('address')
    expect(medicalInsurance).toHaveProperty('contactNumber')
  })

  it('has this properties default values', () => {
    expect(medicalInsurance.id).toBeNull()
    expect(medicalInsurance.description).toBeNull()
    expect(medicalInsurance.userName).toBeNull()
    expect(medicalInsurance.corporateName).toBeNull()
    expect(medicalInsurance.email).toBeNull()
    expect(medicalInsurance.address).toBeNull()
    expect(medicalInsurance.contactNumber).toBeNull()
  })


  it('can be transformed to json', () => {
    expect(medicalInsurance.toJson()).toEqual('{"id":null,"description":null,"userName":null,"corporateName":null,"email":null,"address":null,"contactNumber":null}')
  })

  it('can be obtained from json', () => {
    medicalInsurance = MedicalInsurance.fromJson(JSON.stringify(testerMedicalInsurance))
    expect(medicalInsurance.id).toEqual(id)
    expect(medicalInsurance.description).toEqual(description)
    expect(medicalInsurance.userName).toEqual(userName)
    expect(medicalInsurance.corporateName).toEqual(corporateName)
    expect(medicalInsurance.email).toEqual(email)
    expect(medicalInsurance.address).toEqual(address)
    expect(medicalInsurance.contactNumber).toEqual(contactNumber)
  })
})
