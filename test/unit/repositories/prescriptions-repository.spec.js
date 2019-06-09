const {PrescriptionRepository} = require('../../../src/repositories/prescriptions-repository')
const {Prescription} = require('../../../src/domain/prescription')
const {states} = require('../../../src/state-machine/state')

describe('When creating a prescription', () => {
    let prescription = new Prescription()
    beforeEach(() => {
        prescription = new Prescription()
        return PrescriptionRepository.reset()
    })

    describe('and prescription hasn`t an id', () => {
        beforeEach(() => {
            prescription.id = null
        })

        it('PrescriptionRepositoy assigns an id to it', ()=> {
            return PrescriptionRepository.create(prescription)
            .then(pres => {
                expect(pres.id).not.toBeNull()
            })
        })

        it('PrescriptionRepositoy stores it and increment the repo`s count', ()=> {
            return PrescriptionRepository.create(prescription)
            .then(pres => {
                return PrescriptionRepository.count()
                .then(cantidad => {
                    expect(cantidad).toBe(1)
                })
            })
        })
    })

    describe('and prescription has an id', () => {
        beforeEach(() => {
            prescription.id = 1
        })

        it('PrescriptionRepositoy reject the promise with an error', ()=> {
            return expect(PrescriptionRepository.create(prescription)).rejects.not.toBeNull()
        })

        it('PrescriptionRepositoy doesn`t increment the repo`s count', ()=> {
            return PrescriptionRepository.create(prescription)
            .catch(err => {
                return PrescriptionRepository.count()
                .then(cantidad => {
                    expect(cantidad).toBe(0)
                })
            })
        })
    })
})

let prescription = new Prescription()
beforeEach(() => {
    prescription = new Prescription()
    return PrescriptionRepository.reset()
})

test('when no prescriptions where created, PrescriptionRepository returns an empty array', () => {
    return expect(PrescriptionRepository.getAll()).resolves.toEqual([])
})

test('when prescriptions where created, PrescriptionRepository returns all of the prescriptions', () => {
    return PrescriptionRepository.create(new Prescription())
    .then(prescription1 => {
        PrescriptionRepository.create(new Prescription())
        .then(prescription2 => {
            PrescriptionRepository.getAll()
            .then(prescriptions => {
                expect(prescriptions).toContain(prescription1)
                expect(prescriptions).toContain(prescription2)
                expect(prescriptions.length).toBe(2)
            })
        })
    })
})

describe('when you create some prescriptions by PrescriptionRepository', () => {
    let prescription1 = new Prescription()
    let prescription2 = new Prescription()
    let prescription3 = new Prescription()
    beforeEach(() => {
        prescription1 = new Prescription()
        prescription1.status = states.ISSUED.status
        prescription2 = new Prescription()
        prescription2.status = states.CONFIRMED.status
        prescription3 = new Prescription()
        prescription3.status = states.ISSUED.status
        PrescriptionRepository.reset()
        .then(_ => {
            return Promise.all([
                PrescriptionRepository.create(prescription1).then(pres => {prescription1 = pres.clone(); return pres}),
                PrescriptionRepository.create(prescription2).then(pres => {prescription2 = pres.clone(); return pres}),
                PrescriptionRepository.create(prescription3).then(pres => {prescription3 = pres.clone(); return pres})
            ])
        })
    })

    describe('and want to get one by id', () => {
        describe('and it`s a valid id', () => {
            it('it returns the prescription', () => {
                return PrescriptionRepository.getById(prescription1.id)
                .then(pres => {
                    expect(pres.id).toBe(prescription1.id)
                })
            })
        })

        describe('and it`s an invalid id', () => {
            it('it rejects the search', () => {
                return expect(PrescriptionRepository.getById(prescription1.id + 9999)).rejects.not.toBeNull()
            })
        })
    })

    describe('and want to update one', () => {
        describe('and has a valid id', () => {
            it('it updates it and returns the prescription', () => {
                const prescription = prescription1.clone()
                prescription.setIssuedDate('12/12/1990 00:00')
                prescription.prolongedTreatment = true
                prescription.status = 'jaja'
                return PrescriptionRepository.update(prescription)
                .then(pres => {
                    expect(pres.getIssuedDate()).toBe(prescription.getIssuedDate())
                    expect(pres.prolongedTreatment).toBe(prescription.prolongedTreatment)
                    expect(pres.status).toBe(prescription.status)
                })
            })
        })

        describe('and has an invalid id', () => {
            it('it rejects the update', () => {
                const prescription = prescription1.clone()
                prescription.id = prescription.id + 9999
                return expect(PrescriptionRepository.update(prescription)).rejects.not.toBeNull()
            })
        })
    })

    describe('and wants to get some by status', () => {
        it('it returns the matching prescriptions', () => {
            return PrescriptionRepository.getByStatus(states.ISSUED.status)
            .then(prescriptions => {
                expect(prescriptions.map((pres) => pres.id)).toContainEqual(prescription1.id)
                expect(prescriptions.map((pres) => pres.id)).toContainEqual(prescription3.id)
                expect(prescriptions.every((pres) => {return pres.status = states.ISSUED.status})).toBeTruthy()
                return PrescriptionRepository.getByStatus(states.PARTIALLY_RECEIVED.status)
                .then(prescriptions => {
                    expect(prescriptions.length).toBe(0)
                })
            })
        })
    })

    //TODO: hacer el resto de los test de busqueda por ejemplo
})