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
affiliate.code = 15
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

const testOperator = operator.EQUAL
testOperator.value = 12

const testOperator2 = operator.LESS
testOperator2.value = 3
const testCriteria = new Criteria()
const testCriteria2 = new Criteria()
const testConnector = new Connector()
testCriteria.id = 2
testCriteria.type = 'CRITERIA'
// testCriteria.entity = 'affiliate'
testCriteria.registry = ['affiliate', 'id']
// testCriteria.attribute = 'id'
testCriteria.operator = testOperator

testCriteria2.id = 3
testCriteria2.type = 'CRITERIA'
testCriteria2.registry = ['items']
testCriteria2.operator = testOperator2

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
        prescription = Prescription.fromObject(testPrescription)
        prescription.affiliate.id = 12
        rule.id = idRule
        rule.description = ruleDescription
        rule.setCondition(satisfater)
        expect(rule.satisfies(prescription)).toBeTruthy()
    })
    it('Prescription cumple regla con Cantidad de item menor a 3', () => {
        prescription = Prescription.fromObject(testPrescription)
        rule.id = idRule
        rule.description = ruleDescription
        rule.setCondition(satisfater2)
        expect(rule.satisfies(prescription)).toBeTruthy()
    })
    it('Prescription cumple regla con Cantidad de item menor a 3 o con id existente de affiliate', () => {
        prescription = Prescription.fromJson(JSON.stringify(testPrescription))
        prescription.affiliate.id = 12
        rule.id = idRule
        rule.description = ruleDescription
        rule.setCondition(satisfater3)
        expect(rule.satisfies(prescription)).toBeTruthy()
    })


})