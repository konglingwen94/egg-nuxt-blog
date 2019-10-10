const { historyApiFallback } = require('koa2-connect-history-api-fallback')

module.exports = option => {
  return historyApiFallback({
    index: '/admin/index.html',
  })
}
