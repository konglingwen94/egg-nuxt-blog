const { Controller } = require('egg')
const _ = require('lodash')
const { ParameterException } = require('../utils/httpExceptions')
const jwt = require('jsonwebtoken')
const properties = require('../types/request').admin
const fields = require('../types/response').admin

class AdminController extends Controller {
  async login() {
    const { ctx, config, service } = this

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
      var result = await service.admin.queryByUsername(username)
    } catch (error) {
      throw error
    }

    if (!result) {
      return ctx.throw(404, '没有此用户')
    }
    try {
      var valid = await service.admin.comparePass(password, result.password)
    } catch (error) {
      throw error
    }

    if (!valid) {
      return ctx.throw(403, '密码不正确')
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
    const { ctx, service } = this
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
      var { password } = await service.admin.queryById(id)
    } catch (error) {
      throw error
    }
    const valid = await service.admin.comparePass(oldPassword, password)

    if (!valid) {
      return ctx.throw(403, '错误的原密码')
    }

    try {
      var hashPass = await bcrypt.hash(newPassword, 10)
    } catch (error) {
      throw error
    }
    try {
      await service.admin.queryByIdAndUpdate(id, { password: hashPass })
    } catch (error) {
      throw error
    }
    ctx.status = 204
  }
  async changeAccount() {
    const { ctx, service } = this
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
      await service.admin.queryByIdAndUpdate(id, { nickname })
    } catch (error) {
      throw error
    }
    ctx.status = 204
  }
}

module.exports = AdminController
