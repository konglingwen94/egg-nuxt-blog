const { Service } = require('egg')
 

class AboutService extends Service {
  async create(payload) {
    var result = this.ctx.model.About.create(payload)
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
