class Institution {
    constructor(){
        this.id = null
        this.description = null
        this.address = null
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            description: this.description,
            address: this.address
        })
    }

    static fromJson(json = '{}') {
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const institution = new Institution()
        institution.id = object.id
        institution.description = object.description
        institution.address = object.address
        return institution
    }
}

module.exports = { Institution }