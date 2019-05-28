const { Doctor } = require('../../../src/domain/doctor')
const { formats } = require('../../../src/utils/utils')
const moment = require('moment')


const id = 1
const name = 'Juan'
const lastName = 'Anoinmo'
const userName = 'janonimo'
const password = 'juanonimo123'
const birthDate = '13/04/1993'
const entryDate = '04/05/1996'
const leavingDate = '07/08/1999'
const contactNumber = 1122334455
const nationality = 'Argentina'
const address = 'Francia 1492'
const email = 'juan.anonimo@correo.com'
const nationalMatriculation = 665544
const provincialMatriculation = 887766

const testDoctor = { id, name, lastName, userName, password, birthDate, entryDate, leavingDate, contactNumber, nationality, address, email, nationalMatriculation, provincialMatriculation }

describe('Doctor', () => {
    let doctor = new Doctor()

    beforeEach(() => {
        doctor = new Doctor()
    })

    it('has all this properties', () => {
        expect(doctor).toHaveProperty('id')
        expect(doctor).toHaveProperty('name')
        expect(doctor).toHaveProperty('lastName')
        expect(doctor).toHaveProperty('userName')
        expect(doctor).toHaveProperty('password')
        expect(doctor).toHaveProperty('birthDate')
        expect(doctor).toHaveProperty('entryDate')
        expect(doctor).toHaveProperty('leavingDate')
        expect(doctor).toHaveProperty('contactNumber')
        expect(doctor).toHaveProperty('nationality')
        expect(doctor).toHaveProperty('address')
        expect(doctor).toHaveProperty('email')
        expect(doctor).toHaveProperty('nationalMatriculation')
        expect(doctor).toHaveProperty('provincialMatriculation')
    })

    it('has this properties default values', () => {
        expect(doctor.id).toBeNull()
        expect(doctor.name).toBeNull()
        expect(doctor.lastName).toBeNull()
        expect(doctor.userName).toBeNull()
        expect(doctor.password).toBeNull()
        expect(doctor.birthDate).toBeNull()
        expect(doctor.entryDate).toBeNull()
        expect(doctor.leavingDate).toBeNull()
        expect(doctor.contactNumber).toBeNull()
        expect(doctor.nationality).toBeNull()
        expect(doctor.address).toBeNull()
        expect(doctor.email).toBeNull()
        expect(doctor.nationalMatriculation).toBeNull()
        expect(doctor.provincialMatriculation).toBeNull()


    })

    it('can be transformed to json', () => {
        expect(doctor.toJson()).toEqual("{\"id\":null,\"name\":null,\"lastName\":null,\"userName\":null,\"password\":null,\"birthDate\":null,\"entryDate\":null,\"leavingDate\":null,\"contactNumber\":null,\"nationality\":null,\"address\":null,\"email\":null,\"nationalMatriculation\":null,\"provincialMatriculation\":null}")
    })

    it('can be obtained from json', () => {
        doctor = Doctor.fromJson(JSON.stringify(testDoctor))
        expect(doctor.id).toEqual(id)
        expect(doctor.name).toEqual(name)
        expect(doctor.lastName).toEqual(lastName)
        expect(doctor.userName).toEqual(userName)
        expect(doctor.password).toEqual(password)
        expect(doctor.getBirthDate()).toEqual(birthDate)
        expect(doctor.getEntryDate()).toEqual(entryDate)
        expect(doctor.getLeavingDate()).toEqual(leavingDate)
        expect(doctor.contactNumber).toEqual(contactNumber)
        expect(doctor.nationality).toEqual(nationality)
        expect(doctor.address).toEqual(address)
        expect(doctor.email).toEqual(email)
        expect(doctor.nationalMatriculation).toEqual(nationalMatriculation)
        expect(doctor.provincialMatriculation).toEqual(provincialMatriculation)

    })



    // Testing atributtes of date =D
    it('when you set a valid birth date to a doctor it stores it like a moment', () => {
        const birthDate = '13/04/1993'
        expect(doctor.birthDate).toBeNull()
        doctor.setBirthDate(birthDate)
        expect(moment.isMoment(doctor.birthDate)).toBeTruthy()
        expect(doctor.birthDate.format(formats.dateFormat)).toEqual(birthDate)
    })

    it('when you set a valid entry date to a doctor it stores it like a moment', () => {
        const entryDate = '01/01/1998'
        expect(doctor.entryDate).toBeNull()
        doctor.setEntryDate(entryDate)
        expect(moment.isMoment(doctor.entryDate)).toBeTruthy()
        expect(doctor.entryDate.format(formats.dateFormat)).toEqual(entryDate)
    })

    it('when you set a valid leaving date to a doctor it stores it like a moment', () => {
        const leavingDate = '01/01/1998'
        expect(doctor.leavingDate).toBeNull()
        doctor.setLeavingDate(leavingDate)
        expect(moment.isMoment(doctor.leavingDate)).toBeTruthy()
        expect(doctor.leavingDate.format(formats.dateFormat)).toEqual(leavingDate)
    })



    it('when you set an invalid birth date to a doctor it stores a null', () => {
        const birthDate = '40/02/1998'
        expect(doctor.birthDate).toBeNull()
        doctor.setBirthDate(birthDate)
        expect(doctor.birthDate).toBeNull()
    })
    it('when you set an invalid entry date to a doctor it stores a null', () => {
        const entryDate = '30/02/1998 23:00'
        expect(doctor.entryDate).toBeNull()
        doctor.setEntryDate(entryDate)
        expect(doctor.entryDate).toBeNull()
    })

    it('when you set an invalid leaving date to a doctor it stores a null', () => {
        const leavingDate = '30/02/1998 23:00'
        expect(doctor.leavingDate).toBeNull()
        doctor.setLeavingDate(leavingDate)
        expect(doctor.leavingDate).toBeNull()
    })




    it('when you get the birth date from a doctor that has an entry date it returns a string representation', () => {
        const birthDate = '20/01/1998'
        doctor.setBirthDate(birthDate)
        expect(doctor.getBirthDate()).toEqual(birthDate)
    })
    it('when you get the entry date from a doctor that has an entry date it returns a string representation', () => {
        const entryDate = '01/01/1998'
        doctor.setEntryDate(entryDate)
        expect(doctor.getEntryDate()).toEqual(entryDate)
    })

    it('when you get the leaving date from a doctor that has an leaving date it returns a string representation', () => {
        const leavingDate = '09/02/1998'
        doctor.setLeavingDate(leavingDate)
        expect(doctor.getLeavingDate()).toEqual(leavingDate)
    })




    it('when you get the birth date from a doctor that hasn´t an birth data it returns a null', () => {
        doctor.setBirthDate(null)
        expect(doctor.getBirthDate()).toBeNull()
    })

    it('when you get the entry date from a doctor that hasn´t an entry data it returns a null', () => {
        doctor.setEntryDate(null)
        expect(doctor.getEntryDate()).toBeNull()
    })
    it('when you get the leaving date from a doctor that hasn´t an leaving data it returns a null', () => {
        doctor.setLeavingDate(null)
        expect(doctor.getLeavingDate()).toBeNull()
    })
    
})