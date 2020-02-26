const _ = require('lodash')
const validationRule = require('../types/request')

module.exports = (opt, app) => {
 

  return async function(ctx, next) {
    const matchRule = validationRule[ctx.method]

    if (!matchRule || !ctx.routerName) {
      return next()
    }

    ctx.validate(_.get(matchRule, ctx.routerName), ctx.request.body)

    ctx.state.body = _.pick(
      ctx.request.body,
      _.keys(_.get(matchRule, ctx.routerName))
    )
 
    return next()
  }
}
