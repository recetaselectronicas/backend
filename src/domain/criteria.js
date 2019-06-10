class Criteria {
    constructor() {
        this.id = null
        this.type = null
        this.entity = null
        this.attribute = null
        this.operator = null
        this.value = null
    }

    cumple(presciption) {
       let attributee 
        if (this.entity) {
            attributee = presciption[this.entity]
        }
        if(this.attribute){
            attributee = attributee[this.attribute]
        }
        return this.operator.execute(attributee, this.value)
    }
}

module.exports = { Criteria }