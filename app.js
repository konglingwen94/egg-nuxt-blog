const mongodb = require('./app/db/mongodb')

class AppBootHook {
  constructor(app) {
    this.app = app
    app.config.coreMiddleware.unshift('history', 'docs')
  }

  async willReady() {
    await mongodb.connect(this.app)
  }
}

module.exports = AppBootHook
