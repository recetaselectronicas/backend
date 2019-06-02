class InstitutionRepository {
  constructor() {
    this.institutions = []
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
