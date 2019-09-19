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

module.exports = {
  ParameterException,
  DuplicatingFields,
}
