const { Service } = require('egg')
const AdminModel = require('../model/admin')
const bcrypt = require('bcrypt')

class AdminService extends Service {
  async queryOneByUsername(username) {
    return AdminModel.findOne({ username })
  }
  async queryById(id) {
    return AdminModel.findById(id)
  }
  async comparePass(oldPass, pass) {
    return bcrypt.compareSync(...arguments)
  }
  async queryByIdAndUpdate(id, payload) {
    return AdminModel.findByIdAndUpdate(id, { $set: payload })
  }
}

module.exports = AdminService
