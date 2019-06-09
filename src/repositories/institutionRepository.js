const {Institution} = require('../domain/institution')
const {newEntityAlreadyCreated} = require('../utils/errors')

class InstitutionRepository {
  constructor() {
    this.institutions = []
  }

  create(_institution){
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
}

module.exports = {
  InstitutionRepository: new InstitutionRepository()
}
