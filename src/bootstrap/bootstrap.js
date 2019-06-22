const { Affiliate } = require('../domain/affiliate')
const { Doctor } = require('../domain/doctor')
const { Institution } = require('../domain/institution')
const { Item } = require('../domain/item')
const { MedicalInsurance } = require('../domain/medicalInsurance')
const { Medicine } = require('../domain/medicine')
const { Pharmacist } = require('../domain/pharmacist')
const { Plan } = require('../domain/plan')
const { Prescription } = require('../domain/prescription')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { InstitutionRepository } = require('../repositories/institutionRepository')
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { MedicineRepository } = require('../repositories/medicineRepository')
const { PrescriptionRepository } = require('../repositories/prescriptions-repository')
const { DoctorRepository } = require('../repositories/doctorRepository')
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const { logger } = require('../utils/utils')
const { states } = require('../state-machine/state')

let medicine1 = new Medicine()
medicine1.description = 'T4 Montpellier 150 Levotiroxina'
medicine1.laboratoryDescription = 'Montpellier'
medicine1.potencyDescription = '150 mcg'
medicine1.presentationDescription = 'comprimidos'
medicine1.sizeDescription = '45 u'
medicine1.brandDescription = 'T4 Montpellier'
medicine1.drugDescription = 'Levotiroxina'
medicine1.pharmaceuticalAction = 'tiroide'
medicine1.barCode = '7791231827381'
medicine1.troquel = '187482-2'
medicine1.setEntryDate('12/12/12')

let medicine2 = new Medicine()
medicine2.description = 'T4 Montpellier 137 Levotiroxina'
medicine2.laboratoryDescription = 'Montpellier'
medicine2.potencyDescription = '137 mcg'
medicine2.presentationDescription = 'comprimidos'
medicine2.sizeDescription = '45 u'
medicine2.brandDescription = 'T4 Montpellier'
medicine2.drugDescription = 'Levotiroxina'
medicine2.pharmaceuticalAction = 'tiroide'
medicine2.barCode = '7791231827382'
medicine2.troquel = '187481-1'
medicine2.setEntryDate('12/12/12')

let medicine3 = new Medicine()
medicine3.description = 'Betacort Cassará'
medicine3.laboratoryDescription = 'Medisol'
medicine3.potencyDescription = '0,05%'
medicine3.presentationDescription = 'crema'
medicine3.sizeDescription = '15 gr'
medicine3.brandDescription = 'Betacort'
medicine3.drugDescription = 'Betametasona'
medicine3.pharmaceuticalAction = 'Corticoide potente grupo 3'
medicine3.barCode = '77955730132475'
medicine3.troquel = '476657-1'
medicine3.setEntryDate('12/12/12')

let institution1 = new Institution()
institution1.description = 'Centro de Salud y Accion Comunitario'
institution1.address = 'Gral Jose Gervasio Artigas 2262'

let institution2 = new Institution()
institution2.description = 'Centro Femme'
institution2.address = 'Mariscal Francisco Solano Lopez 3114'

let institution3 = new Institution()
institution3.description = 'CeSAC'
institution3.address = 'Mercedes 1371'

let institution4 = new Institution()
institution4.description = 'Bliss Beauty Center'
institution4.address = 'Cuenca 2925'

let institution5 = new Institution()
institution5.description = 'Vacunar'
institution5.address = 'Blanco Encalada 4881'

let affiliate1 = new Affiliate()
affiliate1.idPatient = 1
affiliate1.name = 'Gonzalo'
affiliate1.surname = 'Grass Canton'
affiliate1.userName = 'gussy-canton'
affiliate1.setBirthDate('12/12/2012')
affiliate1.gender = 'M'
affiliate1.contactNumber = '1540404040'
affiliate1.email = 'gussygonzalo@gmail.com'
affiliate1.address = 'tu vieja 123'
affiliate1.nationality = 'ARGENTINO'
affiliate1.nicNumber = '40000000'
affiliate1.setNicIssueDate('01/01/2001')
affiliate1.nicType = 'DNI'
affiliate1.nicExemplary = '1'
affiliate1.nicPhoto = null
affiliate1.setFromDate('01/11/1900')
affiliate1.setToDate('01/12/2020')
affiliate1.code = '00048124'
affiliate1.category = '01'
affiliate1.imageCredential = null
affiliate1.plan = new Plan()
affiliate1.plan.id = 1
affiliate1.plan.percentage = 40.0
affiliate1.plan.description = 'PMO'
affiliate1.plan.idMedicalInsurance = null

let affiliate2 = new Affiliate()
affiliate2.idPatient = 2
affiliate2.name = 'Nicolas'
affiliate2.surname = 'Medila'
affiliate2.userName = 'nico-medimela'
affiliate2.setBirthDate('12/01/2000')
affiliate2.gender = 'F'
affiliate2.contactNumber = '1540404040'
affiliate2.email = 'nicomedila@gmail.com'
affiliate2.address = 'tu vieja 123'
affiliate2.nationality = 'ARGENTINO'
affiliate2.nicNumber = '40000000'
affiliate2.setNicIssueDate('01/01/2001')
affiliate2.nicType = 'DNI'
affiliate2.nicExemplary = '1'
affiliate2.nicPhoto = null
affiliate2.setFromDate('01/11/1900')
affiliate2.setToDate('01/12/2020')
affiliate2.code = '00002371623'
affiliate2.category = '02'
affiliate2.imageCredential = null
affiliate2.plan = new Plan()
affiliate2.plan.id = 1
affiliate2.plan.percentage = 70.0
affiliate2.plan.description = 'Cronicos'
affiliate2.plan.idMedicalInsurance = null

let doctor1 = new Doctor()
doctor1.userName = 'pepe'
doctor1.name = 'Jose'
doctor1.lastName = 'Pintimalli'
doctor1.nationality = 'ARGENTINO'
doctor1.email = 'pepe@medic.com'
doctor1.address = 'Lo loca 412'
doctor1.contactNumber = '1520202020'
doctor1.specialty = { id: 1, description: 'Oncologo' }
doctor1.setBirthDate('01/02/1957')
doctor1.setEntryDate('10/10/2013')
doctor1.setLeavingDate()
doctor1.nationalMatriculation = '12837123'
doctor1.provincialMatriculation = '992831'

let doctor2 = new Doctor()
doctor2.userName = 'rico'
doctor2.name = 'Enrrique'
doctor2.lastName = 'Rompebol'
doctor2.nationality = 'ARGENTINO'
doctor2.email = 'enrrique@medic.com'
doctor2.address = 'Otra calle fumeta 8323'
doctor2.contactNumber = '1520202020'
doctor2.specialty = { id: 2, description: 'Odontologo' }
doctor2.setBirthDate('02/10/1933')
doctor2.setEntryDate('12/08/2013')
doctor2.setLeavingDate()
doctor2.nationalMatriculation = '12837213'
doctor2.provincialMatriculation = '992123'

let doctor3 = new Doctor()
doctor3.userName = 'rosco'
doctor3.name = 'Rosco'
doctor3.lastName = 'Negrini'
doctor3.nationality = 'VENEZOLANO'
doctor3.email = 'rosco@medic.com'
doctor3.address = 'Menro 932'
doctor3.contactNumber = '1520202020'
doctor3.specialty = { id: 3, description: 'Clinico' }
doctor3.setBirthDate('01/02/1952')
doctor3.setEntryDate('10/10/2014')
doctor3.setLeavingDate()
doctor3.nationalMatriculation = '82718323'
doctor3.provincialMatriculation = '828781'

let pharmacist1 = new Pharmacist()
pharmacist1.userName = 'andale'
pharmacist1.name = 'Anda'
pharmacist1.lastName = 'Lepint'
pharmacist1.nationality = 'ARGENTINO'
pharmacist1.email = 'andale@gmail.com'
pharmacist1.address = 'Lo loca 412'
pharmacist1.contactNumber = '1520202020'
pharmacist1.setBirthDate('01/02/1957')
pharmacist1.setEntryDate('10/10/2013')
pharmacist1.setLeavingDate()
pharmacist1.matriculation = '8271236'

let pharmacist2 = new Pharmacist()
pharmacist2.userName = 'mavilar'
pharmacist2.name = 'Maria'
pharmacist2.lastName = 'Avilar'
pharmacist2.nationality = 'ARGENTINO'
pharmacist2.email = 'mavilar@yahoo.com'
pharmacist2.address = 'Otra calle fumeta 8323'
pharmacist2.contactNumber = '1520202020'
pharmacist2.setBirthDate('02/10/1933')
pharmacist2.setEntryDate('12/08/2013')
pharmacist2.setLeavingDate()
pharmacist2.matriculation = '1837172'

let pharmacist3 = new Pharmacist()
pharmacist3.userName = 'alan'
pharmacist3.name = 'Alan'
pharmacist3.lastName = 'Johnson'
pharmacist3.nationality = 'VENEZOLANO'
pharmacist3.email = 'ajohnson@gmail.com'
pharmacist3.address = 'Menro 932'
pharmacist3.contactNumber = '1520202020'
pharmacist3.setBirthDate('01/02/1952')
pharmacist3.setEntryDate('10/10/2014')
pharmacist3.setLeavingDate()
pharmacist3.matriculation = '17347823'

let prescription1 = new Prescription()
prescription1.diagnosis = 'Malestar general'
prescription1.norm = 1
prescription1.ttl = 30
prescription1.status = states.CONFIRMED.id
prescription1.prolongedTreatment = true
prescription1.setIssuedDate('01/06/2019 09:30')

let prescription2 = new Prescription()
prescription2.diagnosis = 'Diarrea y vómitos'
prescription2.norm = 1
prescription2.ttl = 30
prescription2.status = states.RECEIVED.id
prescription2.prolongedTreatment = false
prescription2.setIssuedDate('20/05/2019 11:35')

let prescription3 = new Prescription()
prescription3.diagnosis = 'Erupcion cutanea'
prescription3.norm = 1
prescription3.ttl = 30
prescription3.status = states.AUDITED.id
prescription3.prolongedTreatment = false
prescription3.setIssuedDate('12/04/2019 15:50')

const generateData = async () => {
  try {
    medicalInsurance1Id = 1
    medicalInsurance2Id = 2
    medicalInsurance3Id = 3
    const medicalInsurance1DB = await MedicalInsuranceRepository.getById(medicalInsurance1Id)
    const medicalInsurance2DB = await MedicalInsuranceRepository.getById(medicalInsurance2Id)
    medicine1 = await MedicineRepository.create(medicine1)
    medicine2 = await MedicineRepository.create(medicine2)
    medicine3 = await MedicineRepository.create(medicine3)
    institution1 = await InstitutionRepository.create(institution1)
    institution2 = await InstitutionRepository.create(institution2)
    institution3 = await InstitutionRepository.create(institution3)
    institution4 = await InstitutionRepository.create(institution4)
    institution5 = await InstitutionRepository.create(institution5)
    affiliate1.plan.idMedicalInsurance = medicalInsurance1Id
    affiliate2.plan.idMedicalInsurance = medicalInsurance2Id
    affiliate1 = await AffiliateRepository.create(affiliate1)
    affiliate2 = await AffiliateRepository.create(affiliate2)
    const affiliate1DB = await AffiliateRepository.getById(affiliate1)
    doctor1 = await DoctorRepository.create(doctor1)
    doctor2 = await DoctorRepository.create(doctor2)
    doctor3 = await DoctorRepository.create(doctor3)
    pharmacist1 = await PharmacistRepository.create(pharmacist1)
    pharmacist2 = await PharmacistRepository.create(pharmacist2)
    pharmacist3 = await PharmacistRepository.create(pharmacist3)
    prescription1.setMedicalInsurance(medicalInsurance1DB)
    prescription1.setAffiliate(affiliate1DB)
    prescription1.setDoctor(await DoctorRepository.getById(doctor1))
    prescription1.setInstitution(await InstitutionRepository.getById(institution1))
    const item1 = new Item()
    prescription2.setMedicalInsurance(medicalInsurance2DB)
    item1.prescribe(2, await MedicineRepository.getById(medicine1))
    prescription1.addItem(item1)
    prescription2.setMedicalInsurance(medicalInsurance2DB)
    prescription2.setAffiliate(await AffiliateRepository.getById(affiliate2))
    prescription2.setDoctor(await DoctorRepository.getById(doctor2))
    prescription2.setInstitution(await InstitutionRepository.getById(institution2))
    const item2 = new Item()
    const dbMedicine2 = await MedicineRepository.getById(medicine2)
    item2.prescribe(2, dbMedicine2)
    item2.receive(2, '21/05/2019 13:02', dbMedicine2, pharmacist1)
    prescription2.addItem(item2)
    prescription2.setSoldDate('21/05/2019 13:02')
    prescription3.setMedicalInsurance(medicalInsurance1DB)
    prescription3.setAffiliate(affiliate1DB)
    prescription3.setDoctor(await DoctorRepository.getById(doctor3))
    prescription3.setInstitution(await InstitutionRepository.getById(institution3))
    const item3 = new Item()
    const dbMedicine3 = await MedicineRepository.getById(medicine3)
    item3.prescribe(1, dbMedicine3)
    item3.receive(1, '13/04/2019 16:00', dbMedicine3, pharmacist2)
    item3.audit(1, dbMedicine3)
    prescription3.addItem(item3)
    prescription3.setSoldDate('13/04/2019 16:00')
    prescription3.setAuditedDate('15/04/2019 14:24')
    prescription1 = await PrescriptionRepository.create(prescription1)
    prescription2 = await PrescriptionRepository.create(prescription2)
    prescription3 = await PrescriptionRepository.create(prescription3)
    logger.info('All mock data generated ok')
  } catch (error) {
    logger.error('An error ocurred during mock data generation')
    logger.error(error)
  }
}

module.exports = {
  generateData
}
