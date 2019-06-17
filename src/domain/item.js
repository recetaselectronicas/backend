const { dateTimeFormat } = require('../utils/utils')

class Item {
  constructor() {
    this.id = null
    this.prescribed = {
      quantity: null,
      medicine: {
        id: null,
      },
    }
    this.received = {
      quantity: null,
      soldDate: null,
      medicine: {
        id: null,
      },
      pharmacist: {
        id: null,
      },
    }
    this.audited = {
      quantity: null,
      medicine: {
        id: null,
      },
    }
  }

  prescribe(quantity, medicine) {
    this.prescribed = {
      quantity,
      medicine,
    }
  }

  receive(quantity, soldDate, medicine, pharmacist) {
    this.received = {
      quantity,
      soldDate,
      medicine,
      pharmacist,
    }
  }

  audit(quantity, medicine) {
    this.audited = {
      quantity,
      medicine,
    }
  }

  getSoldDate() {
    return dateTimeFormat.toString(this.received.soldDate)
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      prescribed: {
        quantity: this.prescribed.quantity,
        medicine: this.prescribed.medicine,
      },
      received: {
        quantity: this.received.quantity,
        soldDate: this.getSoldDate(),
        medicine: this.received.medicine,
        pharmacist: this.received.pharmacist,
      },
      audited: {
        quantity: this.audited.quantity,
        medicine: this.audited.medicine,
      },
    })
  }

  toPlainObject() {
    return JSON.parse(this.toJson())
  }

  static fromJson(json) {
    if (!json) {
      return new Item()
    }
    const object = typeof json === 'object' ? json : JSON.parse(json)
    const item = new Item()
    item.id = object.id || item.id
    const { prescribed, received, audited } = object
    item.prescribe((prescribed && prescribed.quantity) || item.prescribed.quantity, object.prescribed.medicine || item.prescribed.medicine)
    const soldDate = (received && received.soldDate) || item.received.soldDate
    item.receive(
      (object.received && received.quantity) || item.received.quantity,
      dateTimeFormat.toDate(soldDate),
      (received && received.medicine) || item.received.medicine,
      (received && received.pharmacist) || item.received.pharmacist,
    )
    item.audit((audited && audited.quantity) || item.audited.quantity, (audited && audited.medicine) || item.audited.medicine)
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
