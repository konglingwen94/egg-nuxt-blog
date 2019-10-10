const { Controller } = require('egg')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { ParameterException } = require('../utils/httpExceptions')
const jwt = require('jsonwebtoken')
const AdminModel = require('../model/admin')
const { admin: properties } = require('../types/request')
const { admin: fields } = require('../types/response')

class AdminController extends Controller {
  async login() {
    const { ctx, config } = this

    const required = ['username', 'password']

    const schema = { properties, required }
    const data = _.pick(ctx.request.body, required)

    const isValid = ctx.ajv.validate(schema, data)
    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
      return
    }

    const { username, password } = data

    try {
      var result = await AdminModel.findOne({ username })
    } catch (error) {
      throw error
    }

    if (!result) {
      return ctx.throw(404, '没有此用户')
    }
    try {
      var valid = await bcrypt.compare(password, result.password)
    } catch (error) {
      throw error
    }

    if (!valid) {
      return ctx.throw(400, '密码不正确')
    }

    const user = _.pick(result, fields)

    const { secretKey, expiresIn } = config.adminSecret
    const token = jwt.sign(user, secretKey, {
      expiresIn,
    })

    ctx.body = {
      adminInfo: user,
      token,
    }
  }
  async changePass() {
    const { ctx } = this
    const required = ['oldPassword', 'newPassword', 'id']
    const { id } = ctx.params
    const schema = {
      required,
      properties,
    }

    const data = _.pick(ctx.request.body, required)

    const isValid = ctx.ajv.validate(schema, { ...data, id })

    if (!isValid) {
      throw new ParameterException(ctx.ajv.errors)
    }
    const { oldPassword, newPassword } = data

    try {
      var { password } = await AdminModel.findById(id)
    } catch (error) {
      throw error
    }

    const valid = bcrypt.compareSync(oldPassword, password)

    if (!valid) {
      return ctx.throw(400, '错误的原密码')
    }

    try {
      var hashPass = await bcrypt.hash(newPassword, 10)
    } catch (error) {
      throw error
    }
    try {
      await AdminModel.findByIdAndUpdate(id, { password: hashPass })
    } catch (error) {
      throw error
    }
    ctx.status = 204
  }
  async changeAccount() {
    const { ctx } = this
    const { id } = ctx.params
    const required = ['nickname', 'id']

    const { nickname } = ctx.request.body

    const valid = ctx.ajv.validate(
      {
        required,
        properties,
      },
      {
        nickname,
        id,
      }
    )

    if (!valid) {
      throw new ParameterException(ctx.ajv.errors)
    }

    try {
      await AdminModel.findByIdAndUpdate(id, { $set: { nickname } })
    } catch (error) {
      throw error
    }
    ctx.status = 204
  }
}

module.exports = AdminController
