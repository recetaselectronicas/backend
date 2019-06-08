const { dateFormat } = require('../utils/utils')

class Medicine {
    constructor() {
        this.id = null
        this.description = null
        this.troquel = null
        this.pharmaceuticalAction = null
        this.entryDate = null
        this.leavingDate = null
        this.barCode = null
        this.brandDescription = null
        this.sizeDescription = null
        this.presentationDescription = null
        this.drugDescription = null
        this.laboratoryDescription = null
        this.potencyDescription = null
    }

    setEntryDate(date) {
        this.entryDate = dateFormat.toDate(date)
    }
    
    getEntryDate() {
        return dateFormat.toString(this.entryDate)
    }

    setLeavingDate(date) {
        this.leavingDate = dateFormat.toDate(date)
    }
    
    getLeavingDate() {
        return dateFormat.toString(this.leavingDate)
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            description: this.description,
            troquel: this.troquel,
            pharmaceuticalAction: this.pharmaceuticalAction,
            entryDate: this.getEntryDate(),
            leavingDate: this.getLeavingDate(),
            barCode: this.barCode,
            brandDescription: this.brandDescription,
            sizeDescription: this.sizeDescription,
            presentationDescription: this.presentationDescription,
            drugDescription: this.drugDescription,
            laboratoryDescription: this.laboratoryDescription,
            potencyDescription: this.potencyDescription
        })
    }

    static fromJson(json = '{}') {
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const medicine = new Medicine()
        medicine.id = object.id || medicine.id
        medicine.description = object.description || medicine.id
        medicine.troquel = object.troquel || medicine.troquel
        medicine.pharmaceuticalAction = object.pharmaceuticalAction || medicine.pharmaceuticalAction
        medicine.setEntryDate(object.entryDate)
        medicine.setLeavingDate(object.leavingDate)
        medicine.barCode = object.barCode || medicine.barCode
        medicine.brandDescription = object.brandDescription || medicine.brandDescription
        medicine.sizeDescription = object.sizeDescription || medicine.sizeDescription
        medicine.presentationDescription = object.presentationDescription || medicine.presentationDescription
        medicine.drugDescription = object.drugDescription || medicine.drugDescription
        medicine.laboratoryDescription = object.laboratoryDescription || medicine.laboratoryDescription
        medicine.potencyDescription = object.potencyDescription || medicine.potencyDescription
        return medicine
    }

}
module.exports = { Medicine }