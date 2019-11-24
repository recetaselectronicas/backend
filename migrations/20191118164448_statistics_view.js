const { PRESCRIPTIONS_STATISTICS_VIEW, PRESCRIPTION, ITEM, MEDICINE, AFFILIATE, PATIENT, DOCTOR, PHARMACIST } = require('../src/repositories/tablesNames')

exports.up = knex => knex.schema.withSchema('recetas').raw(`
create view ${PRESCRIPTIONS_STATISTICS_VIEW} as
  select ${PRESCRIPTION}.id as 'prescription_id',
         ${ITEM}.id as 'item_id',
         ${PRESCRIPTION}.issued_date as 'prescription_issued_date',
         ${ITEM}.sold_date as 'item_sold_date',
         ${PRESCRIPTION}.audited_date as 'prescription_audited_date',
         concat(${AFFILIATE}.code, "/", ${AFFILIATE}.category) as 'affiliate_credential',
         concat(${PATIENT}.name, " ", ${PATIENT}.surname) as 'patient_name',
         ${DOCTOR}.national_matriculation as 'doctor_national_matriculation',
         concat(${DOCTOR}.name, " ", ${DOCTOR}.last_name) as 'doctor_name',
         ${PHARMACIST}.matriculation as 'pharmacist_matriculation',
         concat(${PHARMACIST}.name, " ", ${PHARMACIST}.last_name) as 'pharmacist_name',
         ${ITEM}.prescribed_quantity as 'item_prescribed_quantity',
         ${ITEM}.received_quantity as 'item_received_quantity',
         ${ITEM}.audited_quantity as 'item_audited_quantity',
         ${MEDICINE}_p.price as 'medicine_prescribed_price',
         ${MEDICINE}_r.price as 'medicine_receivedd_price',
         ${MEDICINE}_a.price as 'medicine_audited_price',
         ${MEDICINE}_p.description as 'medicine_prescribed_description',
         ${MEDICINE}_r.description as 'medicine_received_description',
         ${MEDICINE}_a.description as 'medicine_audited_description',
         ${PRESCRIPTION}.id_state as 'prescription_status',
         ${PRESCRIPTION}.id_norm as 'prescription_norm',
         ${PRESCRIPTION}.id_medical_insurance as 'medical_insurance_id'
    from ${PRESCRIPTION}
   inner join ${ITEM} 
      on ${ITEM}.id_prescription = ${PRESCRIPTION}.id
   inner join ${MEDICINE} ${MEDICINE}_p
      on ${MEDICINE}_p.id = ${ITEM}.id_medicine_prescribed
    left join ${MEDICINE} ${MEDICINE}_r
      on ${MEDICINE}_r.id = ${ITEM}.id_medicine_received
    left join ${MEDICINE} ${MEDICINE}_a
      on ${MEDICINE}_a.id = ${ITEM}.id_medicine_audited
   inner join ${AFFILIATE}
      on ${AFFILIATE}.id = ${PRESCRIPTION}.id_affiliate
   inner join ${PATIENT}
      on ${PATIENT}.id = ${AFFILIATE}.id_patient
   inner join ${DOCTOR}
      on ${DOCTOR}.id = ${PRESCRIPTION}.id_doctor
    left join ${PHARMACIST}
      on ${PHARMACIST}.id = ${ITEM}.id_pharmacist
`)

exports.down = knex => knex.schema.withSchema('recetas').raw(`drop view ${PRESCRIPTIONS_STATISTICS_VIEW}`)
