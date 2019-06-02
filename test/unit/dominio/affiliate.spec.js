const { Affiliate } = require('../../../src/domain/affiliate')
const { Plan } = require('../../../src/domain/plan')
const { formats } = require('../../../src/utils/utils')
const moment = require('moment')

const idPlan = 9
const description = 'SB04'
const entryDate = '31/12/2017'
const leavingDate = '30/11/2027'
const percentage = 20
const idMedicalInsurance = 4

const id = 123
const idPatient = 2
const name = 'Pedro'
const surname = 'Rodriguez'
const userName = 'prodriguez'
const birthDate = '14/05/1994'
const gender = 'M'
const contactNumber = 43218765
const email = 'pedro@rodriguez.com'
const address = 'StreetFake 123'
const nationality = 'Argentina'
const nicNumber = '37863636'
const nicIssueDate = '15/06/1995'
const nicType = 'DNI'
const nicExemplary = 'B'
const nicPhoto = '/photoPedro.jpg'
const fromDate = '16/07/1996'
const toDate = '17/08/1997'
const code = '800006 0980565'
const category = '01'
const imageCredential = '/credentialPedro.jpg'
const plan = new Plan({ idPlan, description, entryDate, leavingDate, percentage, idMedicalInsurance })

const testerAffiliate = {
    id, idPatient, name, surname, userName, birthDate, gender, contactNumber, email, address, nationality, nicNumber, nicIssueDate, nicType, nicExemplary, nicPhoto, fromDate, toDate, code, category, imageCredential, plan
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
        expect(affiliate).toHaveProperty('surname')
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
    it('has this properties default values', () => {
        expect(affiliate.id).toBeNull()
        expect(affiliate.idPatient).toBeNull()
        expect(affiliate.name).toBeNull()
        expect(affiliate.surname).toBeNull()
        expect(affiliate.userName).toBeNull()
        expect(affiliate.birthDate).toBeNull()
        expect(affiliate.gender).toBeNull()
        expect(affiliate.contactNumber).toBeNull()
        expect(affiliate.email).toBeNull()
        expect(affiliate.address).toBeNull()
        expect(affiliate.nationality).toBeNull()
        expect(affiliate.nicNumber).toBeNull()
        expect(affiliate.nicIssueDate).toBeNull()
        expect(affiliate.nicType).toBeNull()
        expect(affiliate.nicExemplary).toBeNull()
        expect(affiliate.nicPhoto).toBeNull()
        expect(affiliate.fromDate).toBeNull()
        expect(affiliate.toDate).toBeNull()
        expect(affiliate.code).toBeNull()
        expect(affiliate.category).toBeNull()
        expect(affiliate.imageCredential).toBeNull()
        expect(affiliate.plan).toBeInstanceOf(Plan)

    })

    it('can be transformed to json', () => {
        expect(affiliate.toJson()).toEqual("{\"id\":null,\"idPatient\":null,\"name\":null,\"surname\":null,\"userName\":null,\"birthDate\":null,\"gender\":null,\"contactNumber\":null,\"email\":null,\"address\":null,\"nationality\":null,\"nicNumber\":null,\"nicIssueDate\":null,\"nicType\":null,\"nicExemplary\":null,\"nicPhoto\":null,\"fromDate\":null,\"toDate\":null,\"code\":null,\"category\":null,\"imageCredential\":null,\"plan\":{\"id\":null,\"description\":null,\"entryDate\":null,\"leavingDate\":null,\"percentage\":null,\"idMedicalInsurance\":null}}")
    })
    it('can be obtained from json', () => {
        affiliate = Affiliate.fromJson(JSON.stringify(testerAffiliate))
        expect(affiliate.id).toEqual(id)
        expect(affiliate.idPatient).toEqual(idPatient)
        expect(affiliate.name).toEqual(name)
        expect(affiliate.surname).toEqual(surname)
        expect(affiliate.userName).toEqual(userName)
        expect(affiliate.getBirthDate()).toEqual(birthDate)
        expect(affiliate.gender).toEqual(gender)
        expect(affiliate.contactNumber).toEqual(contactNumber)
        expect(affiliate.email).toEqual(email)
        expect(affiliate.address).toEqual(address)
        expect(affiliate.nationality).toEqual(nationality)
        expect(affiliate.nicNumber).toEqual(nicNumber)
        expect(affiliate.getNicIssueDate()).toEqual(nicIssueDate)
        expect(affiliate.nicType).toEqual(nicType)
        expect(affiliate.nicExemplary).toEqual(nicExemplary)
        expect(affiliate.nicPhoto).toEqual(nicPhoto)
        expect(affiliate.getFromDate()).toEqual(fromDate)
        expect(affiliate.getToDate()).toEqual(toDate)
        expect(affiliate.code).toEqual(code)
        expect(affiliate.category).toEqual(category)
        expect(affiliate.imageCredential).toEqual(imageCredential)
        expect(affiliate.plan).toEqual(plan)

    })

    // Testing atributtes of date =D
    it('when you set a valid birth date to a affiliate it stores it like a moment', () => {
        const birthDate = '12/03/1992'
        expect(affiliate.birthDate).toBeNull()
        affiliate.setBirthDate(birthDate)
        expect(moment.isMoment(affiliate.birthDate)).toBeTruthy()
        expect(affiliate.birthDate.format(formats.dateFormat)).toEqual(birthDate)
    })
    it('when you set a valid Nic Issue date to a affiliate it stores it like a moment', () => {
        const nicIssueDate = '11/02/1991'
        expect(affiliate.nicIssueDate).toBeNull()
        affiliate.setNicIssueDate(nicIssueDate)
        expect(moment.isMoment(affiliate.nicIssueDate)).toBeTruthy()
        expect(affiliate.nicIssueDate.format(formats.dateFormat)).toEqual(nicIssueDate)
    })

    it('when you set a valid from date to a affiliate it stores it like a moment', () => {
        const fromDate = '10/11/1990'
        expect(affiliate.fromDate).toBeNull()
        affiliate.setFromDate(fromDate)
        expect(moment.isMoment(affiliate.fromDate)).toBeTruthy()
        expect(affiliate.fromDate.format(formats.dateFormat)).toEqual(fromDate)
    })
    it('when you set a valid to date to a affiliate it stores it like a moment', () => {
        const toDate = '10/11/1999'
        expect(affiliate.toDate).toBeNull()
        affiliate.setToDate(toDate)
        expect(moment.isMoment(affiliate.toDate)).toBeTruthy()
        expect(affiliate.toDate.format(formats.dateFormat)).toEqual(toDate)
    })

    it('when you set an invalid birth date to a affiliate it stores a null', () => {
        const birthDate = '40/02/1998'
        expect(affiliate.birthDate).toBeNull()
        affiliate.setBirthDate(birthDate)
        expect(affiliate.birthDate).toBeNull()
    })
    it('when you set an invalid Nic Issue date to a affiliate it stores a null', () => {
        const nicIssueDate = '50/02/1998'
        expect(affiliate.nicIssueDate).toBeNull()
        affiliate.setNicIssueDate(nicIssueDate)
        expect(affiliate.nicIssueDate).toBeNull()
    })
    it('when you set an from date to a affiliate it stores a null', () => {
        const fromDate = '50/03/1998'
        expect(affiliate.fromDate).toBeNull()
        affiliate.setFromDate(fromDate)
        expect(affiliate.fromDate).toBeNull()
    })
    it('when you set an to date to a affiliate it stores a null', () => {
        const toDate = '60/03/1998'
        expect(affiliate.toDate).toBeNull()
        affiliate.setToDate(toDate)
        expect(affiliate.toDate).toBeNull()
    })

    it('when you get the birth date from a affiliate that has an birth date it returns a string representation', () => {
        const birthDate = '21/01/1998'
        affiliate.setBirthDate(birthDate)
        expect(affiliate.getBirthDate()).toEqual(birthDate)
    })
    it('when you get the nic Issue date from a affiliate that has an  nic Issue date it returns a string representation', () => {
        const nicIssueDate = '21/01/1998'
        affiliate.setNicIssueDate(nicIssueDate)
        expect(affiliate.getNicIssueDate()).toEqual(nicIssueDate)
    })

    it('when you get the from date from a affiliate that has an  from date it returns a string representation', () => {
        const fromDate = '21/01/1998'
        affiliate.setFromDate(fromDate)
        expect(affiliate.getFromDate()).toEqual(fromDate)
    })

    it('when you get the to date from a affiliate that has an  to date it returns a string representation', () => {
        const toDate = '21/01/1998'
        affiliate.setToDate(toDate)
        expect(affiliate.getToDate()).toEqual(toDate)
    })

    it('when you get the birth date from a affiliate that hasn´t an birth data it returns a null', () => {
        affiliate.setBirthDate(null)
        expect(affiliate.getBirthDate()).toBeNull()
    })
    it('when you get the nic issueDate date from a affiliate that hasn´t an nic Issue date data it returns a null', () => {
        affiliate.setNicIssueDate(null)
        expect(affiliate.getNicIssueDate()).toBeNull()
    })
    it('when you get the from Date date from a affiliate that hasn´t an from date data it returns a null', () => {
        affiliate.setFromDate(null)
        expect(affiliate.getFromDate()).toBeNull()
    })

    it('when you get the to Date date from a affiliate that hasn´t an to date data it returns a null', () => {
        affiliate.setToDate(null)
        expect(affiliate.getToDate()).toBeNull()
    })


})
