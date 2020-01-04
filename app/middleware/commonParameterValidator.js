const _ = require('lodash')

module.exports = () => {
  return async (ctx, next) => {
    const paramKeys = _.keys(ctx.params)

    if (paramKeys.length) {
      const paramSchema = {}
      paramKeys.forEach(key => {
        paramSchema[key] = { type: 'string', max: 24, min: 24 }
      })

      ctx.validate(paramSchema, ctx.params)
    }

    const { requestMethods } = ctx.app.config.commonParameterValidator

    if (!requestMethods.includes(ctx.method) || !ctx._matchedRouteName) {
      return await next()
    }

    const validationSchema = _.cloneDeep(
      ctx.validationRule[ctx._matchedRouteName]
    )

    if (ctx.method === 'PATCH') {
      for (let key in validationSchema) {
        validationSchema[key].required = false
      }
    }

    ctx.validate(validationSchema, ctx.request.body)
    ctx.state.body = _.pick(ctx.request.body, _.keys(validationSchema))
     

    return await next()
  }
}
