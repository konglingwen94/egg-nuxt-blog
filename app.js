// const mongodb = require('./app/db/mongodb')
// const { Nuxt, Builder } = require('nuxt')
// const nuxtConfig = require('./web/nuxt.config')
class AppBootHook {
  constructor(app) {
    this.app = app
    app.config.coreMiddleware.unshift('history', 'docs', 'compress')
  }
  didLoad() {}
  async willReady() {
    // const nuxt = new Nuxt(nuxtConfig)

    // this.app.context.nuxt = nuxt
    // this.app.context.egg = this

    // const builder = new Builder(nuxt)
    // await builder.build() 
    // await nuxt.ready()
    // this.app.mongoose = await mongodb.connect(this.app)
    // console.log('App will ready',this.app.mongoose.modelSchemas)
    console.log('App will ready')
  }
}

module.exports = AppBootHook
