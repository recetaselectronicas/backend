class Criteria {
    constructor() {
        this.id = null
        this.type = null
        this.registry = null
        this.operator = null
    }

    cumple(presciption) {
        let attribute = presciption
        // if (this.entity) {
        //     attributee = presciption[this.entity]
        // }
        // if(this.attribute){
        //     attributee = attributee[this.attribute]
        // }
        this.registry.forEach(element => {
            attribute = attribute[element]
            console.log(attribute)
        });
        return this.operator.execute(attribute)
    }
}

module.exports = { Criteria }