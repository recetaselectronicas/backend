const express = require("express");
const router = express.Router();
const {
  MedicalInsuranceRepository
} = require("../repositories/medicalInsuranceRepository");

router.get("/", async (req, res, next) => {
  try {
    const medicalInsurances = await MedicalInsuranceRepository.getAll();
    return res.status(200).send(medicalInsurances);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
