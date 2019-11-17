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
      statusReason: 'statusReason',
      items: 'items',
      itemsQuantity: 'itemsQuantity'
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
  PLAN: {
    name: 'plan',
    fields: {
      id: 'id'
    }
  },
  DOCTOR: {
    name: 'doctor',
    fields: {
      id: 'id',
    },
  },
  PHARMACIST: {
    name: 'pharmacist',
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
          drug: 'received.medicine.drugDescription'
        },
      },
      received: {
        quantity: 'received.quantity',
        medicine: {
          id: 'received.medicine.id',
        },
        soldDate: 'received.soldDate',
        pharmacist: {
          id: 'received.pharmacist.id'
        },
      },
      audited: {
        quantity: 'audited.quantity',
        medicine: {
          id: 'audited.medicine.id',
        },
      },
    },
  },
  PATIENT: {
    name: 'patient',
    fields: {
      name: 'name',
      surname: 'surname',
      userName: 'userName',
      birthDate: 'birthDate',
      gender: 'gender',
      contactNumber: 'contactNumber',
      email: 'email',
      address: 'address',
      nationality: 'nationality',
      nicNumber: 'nicNumber',
      nicType: 'nicType',
      nicPhoto: 'nicPhoto'
    }
  },
  SPECIALTY: {
    name: 'specialty'
  }
}

module.exports = { codes }
