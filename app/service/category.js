const { Service } = require('egg')
const CategoryModel = require('../model/category')

class CategoryService extends Service {
  async create(payload) {
    return await CategoryModel.create(payload)
  }

  async aggregateList() {
    const { ctx } = this

    const result = CategoryModel.aggregate([
      {
        $lookup: {
          from: 'articles',
          let: { id: '$_id' },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$$id', '$categoryID'] } },
            },
            {
              $project: ctx.projectFields.article,
            },
          ],
          as: 'articles',
        },
      },

      {
        $project: ctx.projectFields.category,
      },

      {
        $sort: {
          createdAt: -1,
        },
      },
    ])

    return result
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
