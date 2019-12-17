module.exports = (opts, app) => {
  return async (ctx, next) => {
    const data = await next()
    console.log(__filename, data)

    if (!data) {
      // ctx.status = 204
    }

    const response = Array.isArray(data)
      ? data.map(item => item.toObject && item.toObject({versionKey:false,transform(doc){

      }}))
      : data && data.toObject && data.toObject({versionKey:false})

    console.log(__filename, response)

    ctx.body = ctx.helper.patchFieldForData(response)
  }
}
