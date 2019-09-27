const mongodb = require('./app/db/mongodb')


class AppBootHook {
  constructor(app) {
    this.app = app
  }

  async willReady() {
    await mongodb.connect(this.app)
  }

}

module.exports = AppBootHook
