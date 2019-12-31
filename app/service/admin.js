const { Service } = require('egg')
const bcrypt = require('bcrypt')

class AdminService extends Service {
  async queryOneByUsername(username) {
    return this.ctx.model.Admin.findOne({ username })
  }
  async queryById(id) {
    return this.ctx.model.Admin.findById(id)
  }
  async comparePass(oldPass, pass) {
    return bcrypt.compareSync(...arguments)
  }
  async queryByIdAndUpdate(id, payload) {
    return this.ctx.model.Admin.findByIdAndUpdate(id, { $set: payload })
  }
  async hashPass(pass) {
    return bcrypt.hash(pass, 10)
  }
}

module.exports = AdminService
