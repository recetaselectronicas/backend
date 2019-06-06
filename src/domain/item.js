const { dateTimeFormat } = require('../utils/utils')

class Item {
    constructor() {
        this.id = null
        this.prescribed = {
            quantity: null,
            medicine: {
                id: null
            }
        }
        this.received = {
            quantity: null,
            soldDate: null,
            medicine: {
                id: null
            },
            pharmacist: {
                id: null
            }
        }
        this.audited = {
            quantity: null,
            medicine: {
                id: null
            }
        }
    }
    prescribe(quantity, medicine) {
        this.prescribed = {
            quantity: quantity,
            medicine: { id: medicine.id },
        }
    }

    receive(quantity, solDate, medicine, pharmacist) {
        this.received = {
            quantity: quantity,
            solDate: dateTimeFormat.toDate(soldDate),
            medicine: { id: medicine.id },
            pharmacist: { id: pharmacist.id }
        }
    }
    
    audit(quantity, medicine) {
        this.audit = {
            quantity: quantity,
            medicine: { id: medicine.id }
        }
    }

    getSoldDate(){
       return dateTimeFormat.toString(this.received.soldDate)
    }
    
    toJson() {
        return JSON.stringify(this)
    }

    static fromJson(json) {
        if (!json) {
            return new Item()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const item = new Item()
        item.id = object.id || item.id
        item.prescribed= object.prescribed || item.prescribed
        item.received = object.received || item.received
        item.audited= object.audited || item.audited
        return item
    }

    static fromObject(object) {
        if (!(object instanceof Item)) {
            return Item.fromJson(object)
        }
        return object
    }
}

module.exports = { Item }