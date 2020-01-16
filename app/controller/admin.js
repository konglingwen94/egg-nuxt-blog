const { Controller } = require('egg')
const _ = require('lodash')

const jwt = require('jsonwebtoken')

class AdminController extends Controller {
  async login() {
    const { ctx, config, service } = this

    const data = ctx.request.body

    const { username, password } = data

    const count = await ctx.model.Admin.countDocuments()

    if (count === 0) {
      ctx.throw('500', '数据库管理员数据没有初始化')
    }

    console.log(__filename, count)

    const result = await service.admin.queryOneByUsername(username)

    if (!result) {
      ctx.throw(404, '没有此用户')
    }
    const valid = await service.admin.comparePass(password, result.password)

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
    const passwordRule = ctx.validationRule.admin.password

    ctx.validate(
      {
        newPassword: passwordRule,
        oldPassword: passwordRule,
      },
      payload
    )

    const { oldPassword, newPassword } = payload

    const { password } = await service.admin.queryById(id)
    const passwordValidation = await service.admin.comparePass(
      oldPassword,
      password
    )

    if (!passwordValidation) {
      return ctx.throw(403, '错误的原密码')
    }

    const hashPass = await service.admin.hashPass(newPassword)
    await service.admin.queryByIdAndUpdate(id, { password: hashPass })
  }
  async changeAccount() {
    const { ctx, service } = this
    const { id } = ctx.params

    return ctx.state.ActiveQueryWithParamId.updateOne(
      {},
      { $set: ctx.request.body }
    )
  }
}

module.exports = AdminController
