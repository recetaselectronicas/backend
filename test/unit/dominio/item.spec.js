const { dateTimeFormat } = require('../../../src/utils/utils')
const { Item } = require('../../../src/domain/item')
const moment = require('moment')

const id = 1
const prescribed = {
  quantity: 10,
  medicine: {
    id: 11,
  },
}
const received = {
  quantity: 10,
  soldDate: '15/06/2019 20:00',
  medicine: {
    id: 11,
  },
  pharmacist: {
    id: 1,
  },
}
const audited = {
  quantity: 99,
  medicine: {
    id: 11,
  },
}

const testItem = {
  id, prescribed, received, audited,
}

describe('Item', () => {
  let item = new Item()

  beforeEach(() => {
    item = new Item()
  })

  it('has all this properties', () => {
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('prescribed')
    expect(item).toHaveProperty('prescribed.quantity')
    expect(item).toHaveProperty('prescribed.medicine')
    expect(item).toHaveProperty('received')
    expect(item).toHaveProperty('received.quantity')
    expect(item).toHaveProperty('received.medicine')
    expect(item).toHaveProperty('received.soldDate')
    expect(item).toHaveProperty('received.pharmacist')
    expect(item).toHaveProperty('audited')
    expect(item).toHaveProperty('audited.quantity')
    expect(item).toHaveProperty('audited.medicine')
  })

  it('has this properties default values', () => {
    expect(item.id).toBeNull()
    expect(item.prescribed.quantity).toBeNull()
    expect(item.prescribed.medicine.id).toBeNull()
    expect(item.received.quantity).toBeNull()
    expect(item.received.medicine.id).toBeNull()
    expect(item.received.soldDate).toBeNull()
    expect(item.received.pharmacist.id).toBeNull()
    expect(item.audited.quantity).toBeNull()
    expect(item.audited.medicine.id).toBeNull()
  })
  it('can be transformed to json', () => {
    expect(item.toJson()).toEqual('{\"id\":null,\"prescribed\":{\"quantity\":null,\"medicine\":{\"id\":null,\"description\":null,\"troquel\":null,\"pharmaceuticalAction\":null,\"entryDate\":null,\"leavingDate\":null,\"barCode\":null,\"brandDescription\":null,\"sizeDescription\":null,\"presentationDescription\":null,\"drugDescription\":null,\"laboratoryDescription\":null,\"potencyDescription\":null}},\"received\":{\"quantity\":null,\"soldDate\":null,\"medicine\":{\"id\":null,\"description\":null,\"troquel\":null,\"pharmaceuticalAction\":null,\"entryDate\":null,\"leavingDate\":null,\"barCode\":null,\"brandDescription\":null,\"sizeDescription\":null,\"presentationDescription\":null,\"drugDescription\":null,\"laboratoryDescription\":null,\"potencyDescription\":null},\"pharmacist\":{\"id\":null,\"name\":null,\"lastName\":null,\"userName\":null,\"birthDate\":null,\"entryDate\":null,\"leavingDate\":null,\"contactNumber\":null,\"nationality\":null,\"address\":null,\"email\":null,\"matriculation\":null}},\"audited\":{\"quantity\":null,\"medicine\":{\"id\":null,\"description\":null,\"troquel\":null,\"pharmaceuticalAction\":null,\"entryDate\":null,\"leavingDate\":null,\"barCode\":null,\"brandDescription\":null,\"sizeDescription\":null,\"presentationDescription\":null,\"drugDescription\":null,\"laboratoryDescription\":null,\"potencyDescription\":null}}}')
  })
  it('can be obtained from json', () => {
    item = Item.fromJson(JSON.stringify(testItem))
    expect(item.id).toEqual(id)
    expect(item.prescribed).toEqual(prescribed)
    expect(item.received).toEqual({ ...received, soldDate: dateTimeFormat.toDate(received.soldDate) })
    expect(item.audited).toEqual(audited)
  })

  it('can be obtained from an unknown object', () => {
    item = Item.fromObject(testItem)
    expect(item.id).toEqual(id)
    expect(item.prescribed).toEqual(prescribed)
    expect(item.received).toEqual({ ...received, soldDate: dateTimeFormat.toDate(received.soldDate) })
    expect(item.audited).toEqual(audited)
  })

  it('when you prescribe item with quantity and medicine and is cool', () => {
    const quantity = 20
    const medicine = { id: 54 }
    const testPrecribed = { quantity, medicine }
    item.id = id
    item.prescribe(quantity, medicine)
    expect(item.prescribed).toEqual(testPrecribed)
  })
})
