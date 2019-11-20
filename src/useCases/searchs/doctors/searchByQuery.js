
const { DoctorRepository } = require('../../../repositories/doctorRepository')

const searchByQuery = async ({ nicNumber, gender, nationalMatriculation }) => {
    if (nicNumber && gender) {
        return DoctorRepository.getByNicNumberAndGender(nicNumber, gender)
    }
    if (nationalMatriculation) {
        return DoctorRepository.getByNationalMatriculation(nationalMatriculation)

    }
    return []
}

module.exports = { searchByQuery }