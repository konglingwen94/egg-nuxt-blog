module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  mongoose: {
    enable: false,
    package: 'egg-mongoose',
  },
}
