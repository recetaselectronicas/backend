
const { PharmacistRepository } = require('../../../repositories/pharmacistRepository')

const searchByQuery = async ({ nicNumber, gender, matriculation }) => {
    if (nicNumber && gender) {
        return PharmacistRepository.getByNicNumberAndGender(nicNumber, gender)
    }
    if (matriculation) {
        return PharmacistRepository.getByMatriculation(matriculation)

    }
    return []
}

module.exports = { searchByQuery }