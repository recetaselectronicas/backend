const { Institution } = require('../../../src/domain/institution')

const id = 2
const description = 'Sanatorio Las Lomas'
const address = 'Av. Diego Carman 555'


const testerInstitution = { id, description, address }

describe('Institution', () => {
  let institution = new Institution()

  beforeEach(() => {
    institution = new Institution()
  })

  it('has all this properties', () => {
    expect(institution).toHaveProperty('id')
    expect(institution).toHaveProperty('description')
    expect(institution).toHaveProperty('address')
  })

  it('has this properties default values', () => {
    expect(institution.id).toBeNull()
    expect(institution.description).toBeNull()
    expect(institution.address).toBeNull()
  })


  it('can be transformed to json', () => {
    expect(institution.toJson()).toEqual('{"id":null,"description":null,"address":null}')
  })

  it('can be obtained from json', () => {
    institution = Institution.fromJson(JSON.stringify(testerInstitution))
    expect(institution.id).toEqual(id)
    expect(institution.description).toEqual(description)
    expect(institution.address).toEqual(address)
  })
})
