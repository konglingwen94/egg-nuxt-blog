const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const defaultConfig = require('../config/config.default.js')({ baseDir: '/' })
const prodConfig = require('../config/config.prod.js')({ baseDir: '/' })
const localConfig = require('../config/config.local.js')({ baseDir: '/' })

const AdminModel = require('../app/model/admin.js')
const argv = process.argv.slice(2)
console.log(argv)
if (argv.length !== 3) {
  console.error('NODE_ENV and username and password is required')
  console.log('Please use following command')
  console.log('node scripts/init-admin.js <env> <username> <password>')
  process.exit(1)
}

const [env, username, password] = argv

let config = {}

if (env === 'production') {
  config = Object.assign(defaultConfig, prodConfig)
} else if (env === 'local') {
  config = Object.assign(defaultConfig, localConfig)
} else {
  config = defaultConfig
}

const getHashText = async plainText => {
  try {
    var hash = await bcrypt.hash(plainText, 10)
  } catch (error) {
    console.error(error.message)
    return ''
  }

  return hash
}

const getMongoURI = () => {
  let mongodbURI = 'mongodb://'
  // const { mongodbConfig } = defaultConfig
  const { username, password, host, port, database } = config.mongodb
  if (username) {
    mongodbURI += `${username}:${password}@`
  }

  mongodbURI += `${host}:${port}/${database}`
  if (username) {
    mongodbURI += '?authSource=admin'
  }
  return mongodbURI
}

const mongodbURI = getMongoURI()

const createAdminAccount = () => {
  AdminModel.findOne({ username })
    .exec()
    .then(account => {
      console.log('Query existing account with username from db', {
        username,
        result: account,
      })

      if (account) {
        return Promise.reject(new Error(`Account ${username} is exist`))
      }

      return getHashText(password)
    })
    .then(hashedPassword => {
      const adminAccount = {
        username,
        password: hashedPassword,
        nickname: 'root',
        role: 'ROOT',
        level: 100,
      }
      console.log(`Initial a account with data:`, adminAccount)
      return AdminModel.create(adminAccount)
    })
    .then(() => {
      console.log('Done')
      process.exit(0)
    })
    .catch(err => {
      console.error('Failed to init admin account.', err.message)
      process.exit(1)
    })
}

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch(err => {
    console.error(`Failed to connected  to mongodb ${mongodbURI}.`, err.message)
    process.exit(1)
  })

const db = mongoose.connection

db.on('error', err => {
  console.error(`Catched error from mongodb connection with: `, err.message)
})

db.once('open', () => {
  console.log(`Connected to mongodb with ${mongodbURI} successfully`)
  createAdminAccount()
})
