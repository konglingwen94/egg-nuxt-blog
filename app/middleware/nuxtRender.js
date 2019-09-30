const { Nuxt } = require('nuxt')

module.exports = (option, app) => {
  const { nuxtConfig } = option

  const nuxt = new Nuxt(nuxtConfig)

  return async ctx => {
    ctx.status = 200
    ctx.respond = false
    nuxt.render(ctx.req, ctx.res)
  }
}
