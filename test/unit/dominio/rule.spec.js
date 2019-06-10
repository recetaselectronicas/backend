const { Rule } = require('../../../src/domain/rule')
const { operator } = require('../../../src/domain/operator')
const { Criteria } = require('../../../src/domain/criteria')
const { Connector } = require('../../../src/domain/connector')
const { Prescription } = require('../../../src/domain/prescription')
const { Item } = require('../../../src/domain/item')
const { Affiliate } = require('../../../src/domain/affiliate')
const { Doctor } = require('../../../src/domain/doctor')
const { MedicalInsurance } = require('../../../src/domain/medicalInsurance')
const { Institution } = require('../../../src/domain/institution')
const { states } = require('../../../src/state-machine/state')


const affiliate = new Affiliate()
// affiliate.id = null
const doctor = new Doctor()
doctor.id = 23
const issuedDate = '01/01/1992 12:45'
const soldDate = '02/01/1992 12:45'
const auditedDate = '03/01/1992 12:45'
const diagnosis = 'asdf'
const id = 1
const institution = new Institution()
institution.id = 13
const item = new Item()
item.id = 13
const items = [item]
const medicalInsurance = new MedicalInsurance()
medicalInsurance.id = 44
const norm = 1
const prolongedTreatment = true
const status = states.ISSUED.status
const ttl = 12

const idRule = 4
const ruleDescription = 'Regla 1'
const error = []

const testOperator = operator.EXIST
const testOperator2 = operator.LESS
const testCriteria = new Criteria()
const testCriteria2 = new Criteria()
const testConnector = new Connector()
testCriteria.id = 2
testCriteria.type = 'CRITERIA'
testCriteria.entity = 'affiliate'
testCriteria.attribute = 'id'
testCriteria.operator = testOperator
testCriteria.value = null

testCriteria2.id = 3
testCriteria2.type = 'CONNECTOR'
testCriteria2.entity = 'items'
testCriteria2.operator = testOperator2
testCriteria2.value = 3

testConnector.id = 5
testConnector.type = 'CONNECTOR'

const satisfater = testCriteria
const satisfater2 = testCriteria2

testConnector.conditions = [satisfater, satisfater2]
const satisfater3 = testConnector

const testPrescription = { affiliate, doctor, auditedDate, diagnosis, id, institution, issuedDate, items, medicalInsurance, norm, prolongedTreatment, soldDate, status, ttl }

describe('Rule', () => {
    let rule = new Rule()
    let prescription = new Prescription()
    beforeEach(() => {
        rule = new Rule()
        prescription = new Prescription()
    })

    it('Prescription cumple regla con ID', () => {
        prescription = Prescription.fromJson(JSON.stringify(testPrescription))
        prescription.affiliate.id = 12
        rule.id = idRule
        rule.description = ruleDescription
        rule.setThatSatisfy(satisfater)
        expect(rule.satisfy(prescription)).toBeTruthy()
    })
    it('Prescription cumple regla con Cantidad de item menor a 3', () => {
        prescription = Prescription.fromJson(JSON.stringify(testPrescription))
        rule.id = idRule
        rule.description = ruleDescription
        rule.setThatSatisfy(satisfater2)
        expect(rule.satisfy(prescription)).toBeTruthy()
    })
    it('Prescription cumple regla con Cantidad de item menor a 3 o con id existente de affiliate', () => {
        prescription = Prescription.fromJson(JSON.stringify(testPrescription))
        prescription.affiliate.id = 12
        rule.id = idRule
        rule.description = ruleDescription
        satisfater3.conditions[1].value=1
        console.log(prescription)
        console.log(satisfater3)
        rule.setThatSatisfy(satisfater3)
        expect(rule.satisfy(prescription)).toBeTruthy()
    })


})