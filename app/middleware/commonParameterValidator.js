const _ = require('lodash')

module.exports = () => {
  return async (ctx, next) => {
    const { requestMethods } = ctx.app.config.commonParameterValidator

    if (!requestMethods.includes(ctx.method) || !ctx._matchedRouteName) {
      return await next()
    }

    const paramKeys = _.keys(ctx.params)

    if (paramKeys.length) {
      const paramSchema = {}
      paramKeys.forEach(key => {
        paramSchema[key] = { type: 'string', max: 24, min: 24 }
      })

      ctx.validate(paramSchema, ctx.params)

      // const modelName = _.upperFirst(ctx._matchedRouteName)
      // const result = await ctx.model[modelName].findById(ctx.params.id)
      // debugger
      // if (!result) {
      //   ctx.throw(404, `NotFound ${paramKeys[0]}:${ctx.params.id}`)
      // }
      console.log(__filename, ctx)
    }

    const validationSchema = _.cloneDeep(
      ctx.validationRule[ctx._matchedRouteName]
    )

    if (ctx.method === 'PATCH') {
      for (let key in validationSchema) {
        validationSchema[key].required = false
      }
    }

    // console.log(__filename, validationSchema, ctx.request.body)
    ctx.validate(validationSchema, ctx.request.body)
    ctx.state.body = _.pick(ctx.request.body, _.keys(validationSchema))

    return await next()
  }
}
