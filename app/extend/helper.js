function patchFieldToData(doc) {
  return doc.toObject({
    versionKey: false,
    virtuals: true,
    transform(doc, result) {
     

      Reflect.set(result, 'id', result._id)
      Reflect.deleteProperty(result, '_id')
      return result
    },
  })
}

module.exports = {
  patchFieldToData,
}
