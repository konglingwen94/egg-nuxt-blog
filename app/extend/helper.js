const { Document } = require('mongoose')

 

 

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
   
   
  patchFieldForData,
}
