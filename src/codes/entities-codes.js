const codes = {
  PRESCRIPTION: {
    name: 'prescription',
    fields: {
      issuedDate: 'issuedDate',
      soldDate: 'soldDate',
      auditedDate: 'auditedDate',
      prolongedTreatment: 'prolongedTreatment',
      diagnosis: 'diagnosis',
      ttl: 'ttl',
      institution: 'institution',
      affiliate: 'affiliate',
      doctor: 'doctor',
      medicalInsurance: 'medicalInsurance',
      status: 'status',
      norm: 'norm',
      items: 'items',
    },
  },
  AFFILIATE: {
    name: 'affiliate',
    fields: {
      id: 'id',
    },
  },
  MEDICAL_INSURANCE: {
    name: 'medicalInsurance',
    fields: {
      id: 'id',
    },
  },
  DOCTOR: {
    name: 'doctor',
    fields: {
      id: 'id',
    },
  },
  ITEM: {
    name: 'items',
    fields: {
      prescribed: {
        quantity: 'prescribed.quantity',
        medicine: {
          id: 'prescribed.medicine.id',
        },
      },
    },
  },
}

module.exports = { codes }
