const prescriptionEntity = {
    entity: "PRESCRIPTION"
}

const prescriptionAttributes = [
    {
        attribute: "issuedDate",
        type: "date"
    },
    {
        attribute: "soldDate",
        type: "date"
    },
    {
        attribute: "auditedDate",
        type: "date"
    },
    {
        attribute: "prolongedTreatment",
        type: "boolean"
    },
    {
        attribute: "diagnosis",
        type: "string"
    },
    {
        attribute: "institution",
        type: "entity"
    },
    {
        attribute: "affiliate",
        type: "entity"
    },
    {
        attribute: "doctor",
        type: "entity"
    },
    {
        attribute: "itemsCount",
        type: "number"
    }
]

const doctorAttributes = [
    {
        attribute: "id",
        type: "id"
    },
    {
        attribute: "specialty",
        type: "id"
    }
]

const mayorOperator = (value1, value2) => {}
const minorOperator = (value1, value2) => {}
const equalOperator = (value1, value2) => {}
const isNullOperator = (value) => {}
const isNotNullOperator = (value) => {}
const inOperator = (value, values) => {}

const isConector = (criteria) => {}
const notConector = (condition) => {}
const andConector = (conditions) => {}
const orConector = (conditions) => {}
const implConector = (preCondition, posConditions) => {}