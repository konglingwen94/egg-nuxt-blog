module.exports = {
  publicPath: '/admin',
  outputDir: '../app/public/admin',
  devServer: {
    proxy: 'http://localhost:7001',
  },
}
