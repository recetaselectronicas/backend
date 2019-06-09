const {Doctor} = require('../domain/doctor')
const {newNotFoundError, newEntityAlreadyCreated} = require('../utils/errors')

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

    getById(id) {
        id = +id
        return new Promise((resolve, reject) => {
            const doctor = this.doctors.find((doctor) => {
                return doctor.id === id
            })
            if (doctor) {
                return resolve(Doctor.fromObject(doctor))
            }
            return reject(newNotFoundError(`No doctor was found with id ${id}`))
        })
    }
}
module.exports = {
    DoctorRepository: new DoctorRepository()
}