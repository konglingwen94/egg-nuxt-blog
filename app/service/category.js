const { Service } = require('egg')
const CategoryModel = require('../model/category')

class CategoryService extends Service {
  async create(payload) {
    return CategoryModel.create(payload)
  }

  async queryList() {
    const { ctx } = this

    const result = CategoryModel.find()
      .sort({ createdAt: -1 })
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })

    return result
  }
  async queryById(id) {
    return CategoryModel.findById(id)
      .populate('articleCount')
      .populate({ path: 'articlePublishedCount', match: { isPublished: true } })
      .exec()
  }
  async count() {
    return CategoryModel.countDocuments()
  }
  async queryOneByName(name) {
    return CategoryModel.findOne({ name })
  }
  async queryByIdAndUpdate(id, payload) {
    return CategoryModel.findByIdAndUpdate(id, { $set: payload }).exec()
  }
}

module.exports = CategoryService
