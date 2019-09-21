const { Service } = require('egg')
const CategoryModel = require('../model/category')

class CategoryService extends Service {
  async create(payload) {
    return await CategoryModel.create(payload)
  }
   
  async aggregateList() {
    const { ctx } = this

    return CategoryModel.aggregate([
      {
        $project: ctx.projectFields.category,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ])
  }
  async queryById(id) {
    return CategoryModel.findById(id).exec()
  }
  async count() {
    return CategoryModel.countDocuments()
  }
  async queryOneByName(name) {
    return CategoryModel.findOne({ name })
  }
  async queryByIdAndUpdate(id, payload) {
    return await CategoryModel.findByIdAndUpdate(id, { $set: payload }).exec()
  }
}

module.exports = CategoryService
