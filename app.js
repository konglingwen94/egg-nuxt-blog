const mongodb = require('./app/db/mongodb')

const nuxt = require('./app/nuxt')

class AppBootHook {
  constructor(app) {
    this.app = app
  }

  async willReady() {
    await mongodb.connect(this.app)
  }

  async serverDidReady() {
    await nuxt.init(this.app)
  }
}

module.exports = AppBootHook
