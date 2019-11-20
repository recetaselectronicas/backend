const express = require('express')

const router = express.Router()
const { MedicalInsuranceRepository } = require('../repositories/medicalInsuranceRepository')
const { MedicalBookletRepository } = require('../repositories/medicalBookletRepository')
const { AffiliateRepository } = require('../repositories/affiliateRepository')
const { PharmacistRepository } = require('../repositories/pharmacistRepository')
const { PlanRepository } = require('../repositories/planRepository')

router.get('/', async (req, res, next) => {
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getAllWithPlans()
    return res.status(200).send(medicalInsurances.map(medicalInsurance => medicalInsurance.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/doctors', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const doctors = await MedicalBookletRepository.getDoctorsFrom(identifiedUser.id)
    return res.status(200).send(doctors.map(doctor => doctor.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/affiliates', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const affiliates = await AffiliateRepository.getByMedicalInsurance(identifiedUser.id)
    return res.status(200).send(affiliates.map(affiliate => affiliate.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/pharmacists', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const pharmacists = await PharmacistRepository.getByMedicalInsurance(identifiedUser.id)
    return res.status(200).send(pharmacists.map(pharmacist => pharmacist.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/plans', async (req, res, next) => {
  const { identifiedUser } = req
  try {
    const plans = await PlanRepository.getAllPlansFor(identifiedUser.id)
    return res.status(200).send(plans.map(plan => plan.toPlainObject()))
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getById(id)
    return res.json(medicalInsurances.toPlainObject())
  } catch (e) {
    return next(e)
  }
})

module.exports = router
