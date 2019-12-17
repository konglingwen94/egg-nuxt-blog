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

function patchFieldForData(data) {
  if (typeof data !== 'object') {
    return
  }

  for (let key in data) {
    if (typeof data[key] === 'object' && key !== '_id' && key !== 'id') {
      patchFieldForData(data[key])
    }
    if (key === '_id') {
      Reflect.set(data, 'id', data[key])
      Reflect.deleteProperty(data, key)
    }
  }
  return data
}

module.exports = {
  ParameterException,
  DuplicatingFields,
  patchFieldForData,
}
