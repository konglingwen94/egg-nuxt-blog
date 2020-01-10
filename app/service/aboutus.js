const { Service } = require('egg')

class AboutService extends Service {
  async create(payload) {
    var result = this.ctx.model.Aboutus.create(payload)
    return result
  }
  async queryByIdAndRemove(id) {
    return this.ctx.model.Aboutus.findByIdAndRemove(id)
  }
  async queryByIdAndUpdate(id, payload) {
    return this.ctx.model.Aboutus.findByIdAndUpdate(
      id,
      { $set: payload },
      {
        new: true,
      }
    )
  }
  async queryOne() {
    return this.ctx.model.Aboutus.findOne()
  }
}

module.exports = AboutService
