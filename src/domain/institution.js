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

    toPlainObject(){
        return JSON.parse(this.toJson())
    }

    static fromJson(json = '{}') {
        if (!json){
            return new Institution()
        }
        let object = typeof json === 'object' ? json : JSON.parse(json)
        const institution = new Institution()
        institution.id = object.id || institution.id
        institution.description = object.description || institution.description
        institution.address = object.address  || institution.address
        return institution
    }

    static fromObject(object){
        if (!(object instanceof Institution)){
            return Institution.fromJson(object)
        }
        return object 
    }
}

module.exports = { Institution }