const { Service } = require('egg')
const AboutModel = require('../model/about')

class AboutService extends Service {
  async create(payload) {
    try {
      var result = AboutModel.create(payload)
    } catch (error) {
      return {}
    }
    return result
  }
  async queryByIdAndRemove(id) {
    
    return AboutModel.findByIdAndRemove(id)
  }
  async queryByIdAndUpdate(id, payload) {
    return AboutModel.findByIdAndUpdate(id, { $set: payload })
  }
  async queryOne() {
    return AboutModel.findOne()
  }
}

module.exports = AboutService
