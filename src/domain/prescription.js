class Prescription {
    constructor(){
        this.id = null
        this.issuedDate = null
        this.soldDate = null
        this.auditedDate = null
        this.prolongedTreatment = false
        this.diagnosis = ""
        this.ttl = null
        this.institution = null
        this.affiliate = null
        this.medicalInsurance = null
        this.status = null
        this.norm = null
        this.items = []
    }

    addItem(item){
        this.items.push(item)
    }
}

module.exports = {Prescription}

// ```
// {
//   "id": 1,
//   "fecha_emision": "12/12/12 12:12",
//   "fecha_venta": "12/12/12 12:12",
//   "fecha_auditado": "12/12/12 12:12",
//   "tratamiento_prolongado": true,
//   "diagnostico": "texto",
//   "ttl": 30,
//   "institucion": {
//     "id": 1
//   },
//   "afiliado": {
//     "id": 9999
//   },
//   "obra_social": {
//     "id": 9999
//   },
//   "medico": {
//     "id": 9999
//   },
//   "estado": "EMITIDA",
//   "norma": {
//     "id": 1
//   },
//   "items": [
//     {
//       "id": 1,
//       "recetado": {
//         "cantidad": 99,
//         "medicamento": {
//           "id": 1
//         }
//       },
//       "recepcionado": {
//         "cantidad": 99,
//         "fecha_venta": "12/12/12",
//         "medicamento": {
//           "id": 1
//         },
//         "farmaceutico": {
//           "id": 1
//         }
//       },
//       "auditado": {
//         "cantidad": 99,
//         "medicamento": {
//           "id": 1
//         }
//       }
//     }
//   ]
// }
// ```