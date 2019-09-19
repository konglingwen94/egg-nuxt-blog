const mongodb = require('./app/db/mongodb')

module.exports = app => {
  app.beforeStart(async () => {
    await mongodb.connect(app)
  })
}
