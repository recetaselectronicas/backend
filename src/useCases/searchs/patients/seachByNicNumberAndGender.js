
const { PatientRepository } = require('../../../repositories/patientRepository')

const seachByNicNumberAndGender = ({ nicNumber, gender }) => {
    console.log(nicNumber, gender)
    if (!nicNumber || !gender) {
        return []
    }
    return PatientRepository.getByNicNumberAndGender(nicNumber, gender)
}

module.exports = { seachByNicNumberAndGender }