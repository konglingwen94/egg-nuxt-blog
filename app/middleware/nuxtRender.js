const { Nuxt, Builder } = require('nuxt')

module.exports = (option, app) => {
  const { nuxtConfig } = option

  const nuxt = new Nuxt(nuxtConfig)

  return async ctx => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.controller = app.controller
    ctx.req.service = ctx.service

    await ctx.nuxt.render(ctx.req, ctx.res)
  }
}
