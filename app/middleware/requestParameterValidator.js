const _ = require('lodash')
const defaultValidationRule = require('../types/request')

module.exports = (opt, app) => {
  const patchValidationRule = _.cloneDeep(defaultValidationRule)
  for (let routerName in patchValidationRule) {
    if (routerName === 'configuration') 
    continue
    for (let field in patchValidationRule[routerName]) {
      patchValidationRule[routerName][field].required = false
    }
  }

  
  return async function(ctx, next) {
    const matchMethods = ['POST', 'PATCH']

    if (!matchMethods.includes(ctx.method) || !ctx.routerName) {
      return next()
    }

    switch (ctx.method) {
      case 'PATCH':
        ctx.validate(
          _.get(patchValidationRule, ctx.routerName),
          ctx.request.body
        )
        break
      case 'POST':
        ctx.validate(
          _.get(defaultValidationRule, ctx.routerName),
          ctx.request.body
        )
    }

    ctx.state.body = _.pick(
      ctx.request.body,
      _.keys(_.get(defaultValidationRule, ctx.routerName))
    )

    return next()
  }
}
