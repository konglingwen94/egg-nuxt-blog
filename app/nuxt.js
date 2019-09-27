const { Nuxt, Builder } = require('nuxt')

exports.init = async app => {
  const ctx = app.context
  const { nuxtConfig } = app.config.nuxtRender


  const nuxt = new Nuxt(nuxtConfig)

  app.nuxt = nuxt
  ctx.render = nuxt.render
  try {
    var build = await new Builder(nuxt).build()
  } catch (error) {
    return app.logger.error(error.message)
  }
  // console.log(build)
  console.log('Nuxt initialized success')
}
