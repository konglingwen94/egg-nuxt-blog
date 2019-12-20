const { Document } = require('mongoose')

class ParameterException extends Error {
  constructor(errors) {
    super('Invalid Parameters')
    this.status = 400
    this.errors = errors
  }
}

class DuplicatingFields extends Error {
  constructor(field) {
    super(`重复的${field}`)
  }
}

function patchFieldForData(doc) {
  if (doc instanceof Document) {
    return doc.toObject({
      versionKey: false,
      virtuals: true,
      transform(doc, result) {
        Reflect.set(result, 'id', result._id)
        Reflect.deleteProperty(result, '_id')
        return result
      },
    })
  } else {
    return doc
  }
}

module.exports = {
  ParameterException,
  DuplicatingFields,
  patchFieldForData,
}
