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