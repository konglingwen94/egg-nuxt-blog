const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const config = {
  dest: path.resolve(__dirname, '../../public/docs'),
  base: '/docs/',
  title: '博客',
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
      {
        text: 'GitHub',
        link: 'https://github.com/konglingwen94/egg-nuxt-blog',
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
