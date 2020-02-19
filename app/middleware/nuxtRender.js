const { Nuxt } = require('nuxt')

module.exports = (options, app) => {
  const { nuxtConfig } = options

  const nuxt = new Nuxt(nuxtConfig)

  return async (ctx, next) => {
    ctx.status = 200
    ctx.respond = false

    nuxt.render(ctx.req, ctx.res)
  }
}
