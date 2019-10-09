const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const config = {
  themeConfig: {
    nav: [
      {
        text: 'API',
        link: '/api/',
      },
      {
        text: 'DATABASE',
        link: '/database/',
      },
      {
        text: 'CONFIG',
        link: '/configurations',
      },
    ],
    sidebar: {},
  },
}

const dir = path.resolve(__dirname, '../')

const ingored = ['.vuepress', 'README.md']
const dirList = fs.readdirSync(dir).filter(item => !_.includes(ingored, item))

_.forEach(dirList, item => {
  if (/\.\w+$/g.test(item)) {
    return
  }

  const files = fs.readdirSync(path.resolve(dir, item))

  const arr = _.map(files, item => (item === 'README.md' ? '' : item))

  config.themeConfig.sidebar[`/${item}/`] = arr
})

module.exports = config
