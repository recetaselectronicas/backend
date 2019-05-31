const {PrescriptionRepository} = require('../../../src/repositories/prescriptions-repository')
const {Prescription} = require('../../../src/domain/prescription')

test('if you create a prescription ', () => {

})

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

//TODO: hacer los test para las actualizaciones

describe('when you create some prescriptions', () => {
    let prescription1 = new Prescription()
    let prescription2 = new Prescription()
    let prescription3 = new Prescription()
    beforeEach(() => {
        prescription1 = new Prescription()
        prescription2 = new Prescription()
        prescription3 = new Prescription()
        PrescriptionRepository.reset()
        .then(_ => {
            return Promise.all([
                PrescriptionRepository.create(prescription1).then(pres => {prescription1 = pres; return pres}),
                PrescriptionRepository.create(prescription2).then(pres => {prescription2 = pres; return pres}),
                PrescriptionRepository.create(prescription3).then(pres => {prescription3 = pres; return pres})
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
                return expect(PrescriptionRepository.getById(prescription1.id + 1)).rejects.not.toBeNull()
            })
        })
    })

    //TODO: hacer el resto de los test de busqueda por ejemplo y pos status
})