const { Controller } = require('egg')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AccountController extends Controller {
  async login() {
    const { ctx, config, service } = this

    const data = ctx.request.body

    const { username, password } = data

    const result = await ctx.model.Account.findOne({ username })

    if (!result) {
      ctx.throw(404, '没有此用户')
    }
    const valid = await bcrypt.compareSync(password, result.password)

    if (!valid) {
      ctx.throw(403, '密码不正确')
    }

    const adminInfo = _.omit(ctx.helper.patchFieldToData(result), 'password')

    const { secretKey, expiresIn } = config.adminSecret
    const token = jwt.sign(adminInfo, secretKey, {
      expiresIn,
    })

    return {
      adminInfo,
      token,
    }
  }
  async changePass() {
    const { ctx, service } = this

    const { id } = ctx.params

    const payload = ctx.request.body
    const passwordRule = require('../types/request').admin.password

    ctx.validate(
      {
        newPassword: passwordRule,
        oldPassword: passwordRule,
      },
      payload
    )

    const { oldPassword, newPassword } = payload

    const { password } = await ctx.model.Account.findById(id)
    const passwordValidation = await bcrypt.compareSync(oldPassword, password)

    if (!passwordValidation) {
      return ctx.throw(403, '错误的原密码')
    }

    const hashPass = await bcrypt.hash(newPassword, 10)
    const result = await ctx.model.Account.updateOne(
      { _id: id },
      { $set: { password: hashPass } }
    )
    return { ...result, successMessage: '密码修改成功' }
  }
  async changeAccount() {
    const { ctx, service } = this
    const { id } = ctx.params

    const result = await ctx.model.Account.updateOne(
      { _id: id },
      { $set: ctx.request.body }
    )
    return {
      ...result,
      successMessage: '账户修改成功',
    }
  }
}

module.exports = AccountController
