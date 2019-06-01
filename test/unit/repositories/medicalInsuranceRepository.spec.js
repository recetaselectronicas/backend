const {MedicalInsuranceRepository} = require('../../../src/repositories/medicalInsuranceRepository')

const medicalInsurancesValue = [
    {
        id:0,
        description:"OSDE"
    },
    {
        id:0,
        description:"SWISS MEDICAL"
    }
]
describe('MedicalInsuranceRepository',()=>{
    describe('when has any medical insurance',()=>{
        beforeAll(()=>{
            MedicalInsuranceRepository.medicalInsurances = medicalInsurancesValue
        })
        describe('and ask for all',()=>{
            it('respond with all the medical insurances', async ()=>{
                const result = await MedicalInsuranceRepository.getAll();
                expect(result).toEqual(medicalInsurancesValue)
            })
        });
        
    })
});

/*describe('when prescriptions where created, PrescriptionRepository returns all of the prescriptions', () => {
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
})*/
