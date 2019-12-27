const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-autopopulate'))

exports.connect = async app => {
  return new Promise((resolve, reject) => {
    const mongodbConfig = app.config.mongoose
    const { username, password, database, port, host } = mongodbConfig
    let mongodbURI = 'mongodb://'

    if (username && password) {
      mongodbURI += `${username}:${password}@`
    }

    mongodbURI += `${host}:${port}/${database}`
    if (username && password) {
      mongodbURI += '?authSource=admin'
    }

    mongoose
      .connect(mongodbURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })

      .catch(err => {
        console.error(err)
        reject()
      })

    const db = mongoose.connection
    db.once('open', () => {
      console.log(`Database connected to mongodb ${mongodbURI}`)
      resolve()
    })

    db.on('error', err => {
      console.error(
        `Database failed to connecting on mongodb with.`,
        err.message
      )
    })
  })
}
