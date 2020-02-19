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

    

    
  }
  serverDidReady() {
    console.log('Server did ready')
  }
}

module.exports = AppBootHook
