const { Medicine } = require('../../../src/domain/medicine')
const { formats } = require('../../../src/utils/utils')
const moment = require('moment')

const id = 66
const description = 'Ibuprofeno Ibupirac 400mg de 12 comprimidos'
const troquel = 2341233
const pharmaceuticalAction = 'Antiinflamatorio no esteroideo'
const entryDate = '21/04/2019'
const leavingDate = '25/08/2020'
const barCode = 23245671231231238
const brandDescription = 'Ibupirac'
const sizeDescription = 12
const presentationDescription = 'capsula'
const drugDescription = 'Ibuprofeno'
const laboratoryDescription = 'PFIZER'
const potencyDescription = 400

const testerMedicine = {
  id, description, troquel, pharmaceuticalAction, entryDate, leavingDate, barCode, brandDescription, sizeDescription, presentationDescription, drugDescription, laboratoryDescription, potencyDescription,
}

describe('Medicine', () => {
  let medicine = new Medicine()

  beforeEach(() => {
    medicine = new Medicine()
  })

  it('has all this properties', () => {
    expect(medicine).toHaveProperty('id')
    expect(medicine).toHaveProperty('description')
    expect(medicine).toHaveProperty('troquel')
    expect(medicine).toHaveProperty('pharmaceuticalAction')
    expect(medicine).toHaveProperty('entryDate')
    expect(medicine).toHaveProperty('leavingDate')
    expect(medicine).toHaveProperty('barCode')
    expect(medicine).toHaveProperty('brandDescription')
    expect(medicine).toHaveProperty('sizeDescription')
    expect(medicine).toHaveProperty('presentationDescription')
    expect(medicine).toHaveProperty('drugDescription')
    expect(medicine).toHaveProperty('laboratoryDescription')
    expect(medicine).toHaveProperty('potencyDescription')
  })

  it('has this properties default values', () => {
    expect(medicine.id).toBeNull()
    expect(medicine.description).toBeNull()
    expect(medicine.troquel).toBeNull()
    expect(medicine.pharmaceuticalAction).toBeNull()
    expect(medicine.getEntryDate()).toBeNull()
    expect(medicine.getLeavingDate()).toBeNull()
    expect(medicine.barCode).toBeNull()
    expect(medicine.brandDescription).toBeNull()
    expect(medicine.sizeDescription).toBeNull()
    expect(medicine.presentationDescription).toBeNull()
    expect(medicine.drugDescription).toBeNull()
    expect(medicine.laboratoryDescription).toBeNull()
    expect(medicine.potencyDescription).toBeNull()
  })

  it('can be transformed to json', () => {
    expect(medicine.toJson()).toEqual('{"id":null,"description":null,"troquel":null,"pharmaceuticalAction":null,"entryDate":null,"leavingDate":null,"barCode":null,"brandDescription":null,"sizeDescription":null,"presentationDescription":null,"drugDescription":null,"laboratoryDescription":null,"potencyDescription":null}')
  })

  it('can be obtained from json', () => {
    medicine = Medicine.fromJson(JSON.stringify(testerMedicine))
    expect(medicine.id).toEqual(id)
    expect(medicine.description).toEqual(description)
    expect(medicine.troquel).toEqual(troquel)
    expect(medicine.pharmaceuticalAction).toEqual(pharmaceuticalAction)
    expect(medicine.getEntryDate()).toEqual(entryDate)
    expect(medicine.getLeavingDate()).toEqual(leavingDate)
    expect(medicine.barCode).toEqual(barCode)
    expect(medicine.brandDescription).toEqual(brandDescription)
    expect(medicine.sizeDescription).toEqual(sizeDescription)
    expect(medicine.presentationDescription).toEqual(presentationDescription)
    expect(medicine.drugDescription).toEqual(drugDescription)
    expect(medicine.laboratoryDescription).toEqual(laboratoryDescription)
    expect(medicine.potencyDescription).toEqual(potencyDescription)
  })

  it('when you set a valid entry date to a medicine it stores it like a moment', () => {
    const entryDate = '01/01/1998'
    expect(medicine.entryDate).toBeNull()
    medicine.setEntryDate(entryDate)
    expect(moment.isMoment(medicine.entryDate)).toBeTruthy()
    expect(medicine.entryDate.format(formats.dateFormat)).toEqual(entryDate)
  })

  it('when you set a valid leaving date to a medicine it stores it like a moment', () => {
    const leavingDate = '01/01/1998'
    expect(medicine.leavingDate).toBeNull()
    medicine.setLeavingDate(leavingDate)
    expect(moment.isMoment(medicine.leavingDate)).toBeTruthy()
    expect(medicine.leavingDate.format(formats.dateFormat)).toEqual(leavingDate)
  })

  it('when you set an invalid entry date to a medicine it stores a null', () => {
    const entryDate = '30/02/1998 23:00'
    expect(medicine.entryDate).toBeNull()
    medicine.setEntryDate(entryDate)
    expect(medicine.entryDate).toBeNull()
  })

  it('when you set an invalid leaving date to a medicine it stores a null', () => {
    const leavingDate = '30/02/1998 23:00'
    expect(medicine.leavingDate).toBeNull()
    medicine.setLeavingDate(leavingDate)
    expect(medicine.leavingDate).toBeNull()
  })

  it('when you get the entry date from a medicine that has an entry date it returns a string representation', () => {
    const entryDate = '01/01/1998'
    medicine.setEntryDate(entryDate)
    expect(medicine.getEntryDate()).toEqual(entryDate)
  })

  it('when you get the leaving date from a medicine that has an leaving date it returns a string representation', () => {
    const leavingDate = '09/02/1998'
    medicine.setLeavingDate(leavingDate)
    expect(medicine.getLeavingDate()).toEqual(leavingDate)
  })

  it('when you get the entry date from a medicine that hasn´t an entry data it returns a null', () => {
    medicine.setEntryDate(null)
    expect(medicine.getEntryDate()).toBeNull()
  })
  it('when you get the leaving date from a medicine that hasn´t an leaving data it returns a null', () => {
    medicine.setLeavingDate(null)
    expect(medicine.getLeavingDate()).toBeNull()
  })
})
