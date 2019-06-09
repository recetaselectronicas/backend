const {Doctor} = require('../domain/doctor')
const {newEntityAlreadyCreated} = require('../utils/errors')

class DoctorRepository {
    constructor() {
        this.doctors = []
    }

    create(_doctor){
        return new Promise((resolve, reject) => {
            const doctor = Doctor.fromObject(_doctor)
            if (doctor.id) {
              return reject(newEntityAlreadyCreated('Doctor allready created'))
            }
            doctor.id = Math.floor(Math.random() * 10000)
            this.doctors.push(doctor)
            return resolve(doctor)
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this.doctors])
        })
    }
}
module.exports = {
    DoctorRepository: new DoctorRepository()
}