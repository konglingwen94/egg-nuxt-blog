const { Service } = require('egg')
// const AboutModel = require('../model/about')

class AboutService extends Service {
  async create(payload) {
    try {
      var result = this.ctx.model.About.create(payload)
    } catch (error) {
      return {}
    }
    return result
  }
  async queryByIdAndRemove(id) {
    
    return this.ctx.model.About.findByIdAndRemove(id)
  }
  async queryByIdAndUpdate(id, payload) {
    return this.ctx.model.About.findByIdAndUpdate(id, { $set: payload })
  }
  async queryOne() {
    return this.ctx.model.About.findOne()
  }
}

module.exports = AboutService
