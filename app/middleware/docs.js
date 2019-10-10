const { historyApiFallback } = require('koa2-connect-history-api-fallback')

module.exports = option => {
  return historyApiFallback({
    index: '/docs/index.html',
  })
}
