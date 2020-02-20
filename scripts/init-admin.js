const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/config.default.js')({ baseDir: '/' })
const _ = require('lodash')
const defaultAboutusData = require('../config/defaultAboutusData')

const AdminModel = require('../app/model/account.js')({
  mongoose: require('mongoose'),
})

const BaseModel = require('../app/model/platform.js')({
  mongoose: require('mongoose'),
})

const argv = process.argv.slice(2)

if (argv.length !== 2) {
  console.error('username and password is required')
  console.log('Please use following command')
  console.log('node scripts/init-admin.js <username> <password>')
  process.exit(1)
}

const [username, password] = argv

const getHashText = async plainText => {
  try {
    var hash = await bcrypt.hash(plainText, 10)
  } catch (error) {
    console.error(error.message)
    return ''
  }

  return hash
}

const getMongoConfiguration = () => {
  let mongodbURI = 'mongodb://'
  const { username, password, host, port, database } = config.mongodb

  const mongooseOptions = config.mongoose.options

  if (username && password) {
    mongodbURI += `${username}:${password}@`
  }

  mongodbURI += `${host}:${port}/${database}`
  if (username) {
    mongodbURI += '?authSource=admin'
  }
  return { mongodbURI, mongooseOptions }
}

const { mongodbURI, mongooseOptions } = getMongoConfiguration()

const createAdminAccount = () => {
  return AdminModel.findOne({ username })
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
      return AdminModel.create(adminAccount)
    })
    .then(adminAccount => {
      console.log(`Initial a account with data:`, adminAccount)
      // process.exit(0)
    })
    .catch(err => {
      console.error('Failed to init admin account.', err.message)
      process.exit(1)
    })
}

mongoose.connect(mongodbURI, mongooseOptions).catch(err => {
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
    .then(async () => {
      try {
        var result = await BaseModel.discriminators.Platform.findOne()
      } catch (error) {
        return Promise.reject(error)
      }

      if (result) {
        return  Promise.reject(new Error('Platform is initialized.'))
      }
      const { carousel, message } = defaultAboutusData

      try {
        return  BaseModel.discriminators.Platform.create({
          carousel,
          message,
        })
      } catch (error) {
        return Promise.reject(error)
      }
    })
    .then((platformResult) => {
      console.log('Initial platform data successfully with.', platformResult)
    })
    .catch(err => {
      console.error('Initial platform data failed.', err.message)
      // process.exit(1)
    })
    .then(async () => {
      try {
        var result = await BaseModel.discriminators.Siteintro.findOne()
      } catch (error) {
        return error
      }

      if (result) {
        return Promise.reject(new Error('Siteintro data is initialized'))
      }
      try {
        var createdResult = await BaseModel.discriminators.Siteintro.create(
          _.pick(defaultAboutusData, ['platform', 'profile'])
        )
      } catch (error) {
        return Promise.reject(error)
      }

      console.log('Init siteintro data successfully with \n', createdResult)
    })
    .then(() => {
      console.log('Done.')
      process.exit(0)
    })
    .catch(err => {
      console.error(err.message)
      process.exit(1)
    })
})
