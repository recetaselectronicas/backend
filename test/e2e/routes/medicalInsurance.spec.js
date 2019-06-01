const request = require("supertest");
const { init } = require("../../../src/init/initServer");
const {
  MedicalInsuranceRepository
} = require("../../../src/repositories/medicalInsuranceRepository");

const app = init();

describe("when do a get in /medical-insurance", () => {
  describe("and the repository response ok", () => {
    const medicalInsurancesValue = [
      {
        id: 0,
        description: "OSDE"
      },
      {
        id: 1,
        description: "SWISS MEDICAL"
      }
    ];

    beforeAll(() => {
      MedicalInsuranceRepository.medicalInsurances = medicalInsurancesValue;
    });

    it("return all avaiables the medicalInsurances", () => {
      return request(app)
        .get("/medical-insurance")
        .expect(200)
        .then(res => {
          const firstMedicalInsurance = res.body[0];
          expect(firstMedicalInsurance).toHaveProperty("id");
          expect(firstMedicalInsurance).toHaveProperty("description");
          expect(res.body).toEqual(medicalInsurancesValue);
        });
    });
  });

  describe("and the repository fails on search", () => {
    beforeAll(() => {
      MedicalInsuranceRepository.getAll = () => {
        throw {};
      };
    });

    it("respond with 500 ", () => {
      return request(app)
        .get("/medical-insurance")
        .expect(500);
    });
  });
});

describe("when do a get at /ping", () => {
  it("respond pong", () => {
    return request(app)
      .get("/ping")
      .expect(200)
      .then(res => {
        expect(res.body.message).toEqual("pong");
      });
  });
});
