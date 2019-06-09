const { Institution } = require('../domain/institution')
const { newNotFoundError, newEntityAlreadyCreated } = require('../utils/errors')

class InstitutionRepository {
    constructor() {
        this.institutions = []
    }

    create(_institution) {
        return new Promise((resolve, reject) => {
            const institution = Institution.fromObject(_institution)
            if (institution.id) {
                return reject(newEntityAlreadyCreated('Institution allready created'))
            }
            institution.id = Math.floor(Math.random() * 10000)
            this.institutions.push(institution)
            return resolve(institution)
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.institutions])
        })
    }

    getById(id) {
        id = +id
        return new Promise((resolve, reject) => {
            const institution = this.institutions.find((institution) => {
                return institution.id === id
            })
            if (institution) {
                return resolve(Institution.fromObject(institution))
            }
            return reject(newNotFoundError(`No institution was found with id ${id}`))
        })
    }
}

module.exports = {
    InstitutionRepository: new InstitutionRepository()
}
