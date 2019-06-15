const { Plan } = require('../../../src/domain/plan')
const { formats } = require('../../../src/utils/utils')
const moment = require('moment')

const id = 1
const description = 'SB04'
const entryDate = '31/12/2017'
const leavingDate = '30/11/2027'
const percentage = 20
const idMedicalInsurance = 4

const testPlan = {
  id, description, entryDate, leavingDate, percentage, idMedicalInsurance,
}

describe('Plan', () => {
  let plan = new Plan()

  beforeEach(() => {
    plan = new Plan()
  })

  it('has all this properties', () => {
    expect(plan).toHaveProperty('id')
    expect(plan).toHaveProperty('entryDate')
    expect(plan).toHaveProperty('leavingDate')
    expect(plan).toHaveProperty('percentage')
    expect(plan).toHaveProperty('idMedicalInsurance')
  })

  it('has this properties default values', () => {
    expect(plan.id).toBeNull()
    expect(plan.description).toBeNull()
    expect(plan.getEntryDate()).toBeNull()
    expect(plan.getLeavingDate()).toBeNull()
    expect(plan.percentage).toBeNull()
    expect(plan.idMedicalInsurance).toBeNull()
  })

  it('can be transformed to json', () => {
    expect(plan.toJson()).toEqual('{"id":null,"description":null,"entryDate":null,"leavingDate":null,"percentage":null,"idMedicalInsurance":null}')
  })


  it('can be obtained from json', () => {
    plan = Plan.fromJson(JSON.stringify(testPlan))
    expect(plan.id).toEqual(id)
    expect(plan.description).toEqual(description)
    expect(plan.getEntryDate()).toEqual(entryDate)
    expect(plan.getLeavingDate()).toEqual(leavingDate)
    expect(plan.percentage).toEqual(percentage)
    expect(plan.idMedicalInsurance).toEqual(idMedicalInsurance)
  })


  it('when you set a valid entry date to a plan it stores it like a moment', () => {
    const entryDate = '19/10/2021'
    expect(plan.entryDate).toBeNull()
    plan.setEntryDate(entryDate)
    expect(moment.isMoment(plan.entryDate)).toBeTruthy()
    expect(plan.entryDate.format(formats.dateFormat)).toEqual(entryDate)
  })

  it('when you set a valid leaving date to a plan it stores it like a moment', () => {
    const leavingDate = '09/09/1999'
    expect(plan.leavingDate).toBeNull()
    plan.setLeavingDate(leavingDate)
    expect(moment.isMoment(plan.leavingDate)).toBeTruthy()
    expect(plan.leavingDate.format(formats.dateFormat)).toEqual(leavingDate)
  })


  it('when you set an invalid entry date to a plan it stores a null', () => {
    const entryDate = '30/02/1379 23:00'
    expect(plan.entryDate).toBeNull()
    plan.setEntryDate(entryDate)
    expect(plan.entryDate).toBeNull()
  })

  it('when you set an invalid leaving date to a plan it stores a null', () => {
    const leavingDate = '30/40/1794 23:00'
    expect(plan.leavingDate).toBeNull()
    plan.setLeavingDate(leavingDate)
    expect(plan.leavingDate).toBeNull()
  })

  it('when you get the entry date from a plan that has an entry date it returns a string representation', () => {
    const entryDate = '22/12/2022'
    plan.setEntryDate(entryDate)
    expect(plan.getEntryDate()).toEqual(entryDate)
  })

  it('when you get the leaving date from a plan that has an leaving date it returns a string representation', () => {
    const leavingDate = '08/09/2023'
    plan.setLeavingDate(leavingDate)
    expect(plan.getLeavingDate()).toEqual(leavingDate)
  })


  it('when you get the entry date from a plan that hasn´t an entry data it returns a null', () => {
    plan.setEntryDate(null)
    expect(plan.getEntryDate()).toBeNull()
  })
  it('when you get the leaving date from a plan that hasn´t an leaving data it returns a null', () => {
    plan.setLeavingDate(null)
    expect(plan.getLeavingDate()).toBeNull()
  })
})
