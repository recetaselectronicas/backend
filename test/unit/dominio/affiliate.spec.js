const { Affiliate } = require('../../../src/domain/affiliate')
const { formats } = require('../../../src/utils/utils')
const moment = require('moment')

const id = null
const idPatient = null
const name = null
const lastName = null
const userName = null
const birthDate = null
const gender = null
const contactNumber = null
const email = null
const address = null
const nationality = null
const nicNumber = null
const nicIssueDate = null
const nicType = null
const nicExemplary = null
const nicPhoto = null
const fromDate = null
const toDate = null
const code = null
const category = null
const imageCredential = null
const plan = null

const testerAffiliate = {
    id, idPatient, name, lastName, userName, birthDate, gender, contactNumber, email, address, nationality, nicNumber, nicIssueDate, nicType, nicExemplary, nicPhoto, fromDate, toDate, code, category, imageCredential, plan
}

describe('Affiliate', () => {
    let affiliate = new Affiliate()

    beforeEach(() => {
        affiliate = new Affiliate()
    })

    it('has all this properties', () => {
        expect(affiliate).toHaveProperty('id')
        expect(affiliate).toHaveProperty('idPatient')
        expect(affiliate).toHaveProperty('name')
        expect(affiliate).toHaveProperty('lastName')
        expect(affiliate).toHaveProperty('userName')
        expect(affiliate).toHaveProperty('birthDate')
        expect(affiliate).toHaveProperty('gender')
        expect(affiliate).toHaveProperty('contactNumber')
        expect(affiliate).toHaveProperty('email')
        expect(affiliate).toHaveProperty('address')
        expect(affiliate).toHaveProperty('nationality')
        expect(affiliate).toHaveProperty('nicNumber')
        expect(affiliate).toHaveProperty('nicIssueDate')
        expect(affiliate).toHaveProperty('nicType')
        expect(affiliate).toHaveProperty('nicExemplary')
        expect(affiliate).toHaveProperty('nicPhoto')
        expect(affiliate).toHaveProperty('fromDate')
        expect(affiliate).toHaveProperty('toDate')
        expect(affiliate).toHaveProperty('code')
        expect(affiliate).toHaveProperty('category')
        expect(affiliate).toHaveProperty('imageCredential')
        expect(affiliate).toHaveProperty('plan')
    })

})
