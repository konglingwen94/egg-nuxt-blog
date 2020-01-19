// const mongodb = require('./app/db/mongodb')
// const { Nuxt, Builder } = require('nuxt')
// const nuxtConfig = require('./web/nuxt.config')

const path = require('path')
class AppBootHook {
  constructor(app) {
    this.app = app
    app.config.coreMiddleware.unshift('history', 'docs', 'compress')
  }

  async didLoad() {
    const { mongoose, config, model } = this.app
    const { url } = this.app.config.mongoose

    mongoose.connection.once('close', async () => {
      console.log(`Database is closed on ${url}`)
    })
    mongoose.connection.on('error', error => console.error(error))

    return new Promise((resolve, reject) => {
      mongoose.connection.once('open', async () => {
        console.log(`Database is connected on ${url}`)
        try {
          await model.Aboutus.deleteMany({})
          await model.Aboutus.create(require('./config/defaultAboutusData'))
        } catch (error) {
          return reject()
        }

        resolve()
      })
    })

    
  }
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
    global.app = this.app
    global.mongoose = this.app.mongoose
    global._ = require('lodash')
  }
  serverDidReady() {
    console.log('Server did ready')
  }
}

module.exports = AppBootHook
