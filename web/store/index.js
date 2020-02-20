import _ from 'lodash'
import AboutusService from '@/services/aboutus'
import defaultAboutusData from '../../config/defaultAboutusData'
 
export const state = () => ({
  messageIdListWithThumbup: [],
  aboutus: defaultAboutusData,
})

export const mutations = {
  setAboutus(state, payload) {
    _.merge(state.aboutus, payload)
  },

  pushDiggId(state, id) {
     
    if (!state.messageIdListWithThumbup.includes(id) && id) {
      state.messageIdListWithThumbup.push(id)
    }
  },
  pullDiggId(state, id) {
    const index = state.messageIdListWithThumbup.indexOf(id)

    if (index > -1) {
      state.messageIdListWithThumbup.splice(index, 1)
    }
  },
}

export const actions = {
  async nuxtServerInit() {
    
    try {
      await Promise.all([
        this.dispatch('configuration/fetchData'),
        this.dispatch('weather/fetchWeatherData'),
      ])
    } catch (error) {
      console.error(error)
      // .catch(err => Promise.reject(err))
    }
  },

  fetchAboutusData() {
    // debugger
    return AboutusService.fetchData()
      .then(result => {
        this.commit('setAboutus', result)
      })
      .catch(error => Promise.reject(error))
  },
}
