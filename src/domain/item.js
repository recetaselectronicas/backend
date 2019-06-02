class Item {
    constructor() {
        this.id = null
        this.prescribed = {
            quantity: 99,
            medicine: {
                id: 1
            }
        }
        this.received = {
            quantity: 99,
            soldDate: "12/12/12 10:10",
            medicine: {
                id: 1
            },
            pharmacist: {
                id: 1
            }
        }
        this.audited = {
            quantity: 99,
            medicine: {
                id: 1
            }
        }
    }

    toJson() {
        return JSON.stringify(this)
    }

    static fromJson(json) {
        if (!json){
            return new Item()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const item = new Item()
        item.id = object.id || item.id
        return item
    }

    static fromObject(object){
        if (!(object instanceof Item)){
            return Item.fromJson(object)
        }
        return object 
    }
}

module.exports = { Item }