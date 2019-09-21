const { Service } = require('egg')
const CategoryModel = require('../model/category')

class CategoryService extends Service {
  async create(payload) {
    return await CategoryModel.create(payload)
  }
  async findById(id) {
    return CategoryModel.findById(id).exec()
  }
  async queryOneByOptions(options) {
    return await CategoryModel.findOne(options)
  }
  async update(id, payload) {
    return await CategoryModel.findByIdAndUpdate(id, { $set: payload }).exec()
  }
}

module.exports = CategoryService
