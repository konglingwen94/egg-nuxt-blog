import _ from 'lodash'

export const state = () => ({
  guestbookDiggIdList: [],
  aboutus: {},
})

export const mutations = {
  setAboutus(state, payload) {
    _.merge(state.aboutus, payload)
  },

  pushDiggId(state, id) {
    if (!state.guestbookDiggIdList.includes(id) && id) {
      state.guestbookDiggIdList.push(id)
    }
  },
  pullDiggId(state, id) {
    const index = state.guestbookDiggIdList.indexOf(id)

    if (index > -1) {
      state.guestbookDiggIdList.splice(index, 1)
    }
  },
}

export const actions = {
  async nuxtServerInit() {
    // debugger
    try {
      await Promise.all([
        this.dispatch('fetchAboutusData'),
        this.dispatch('weather/fetchWeatherData'),
      ])
    } catch (error) {
      console.error(error)
      // .catch(err => Promise.reject(err))
    }
  },

  fetchAboutusData() {
    // debugger
    return this.app.service.aboutus
      .fetchData()
      .then(result => {
        this.commit('setAboutus', result)
      })
      .catch(error => Promise.reject(error))
  },
}
