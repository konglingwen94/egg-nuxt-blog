module.exports = {
  publicPath: '/admin',
  outputDir: '../public/admin',
  devServer: {
    proxy: 'http://localhost:7001',
  },
}
