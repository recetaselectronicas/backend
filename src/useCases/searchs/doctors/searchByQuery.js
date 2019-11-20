
const { DoctorRepository } = require('../../../repositories/doctorRepository')

const searchByQuery = async ({ nicNumber, gender, matriculation }) => {
    if (nicNumber && gender) {
        return DoctorRepository.getByNicNumberAndGender(nicNumber, gender)
    }
    if (matriculation) {
        return DoctorRepository.getByNationalMatriculation(matriculation)

    }
    return []
}

module.exports = { searchByQuery }