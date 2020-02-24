import _ from 'lodash'

export const state = () => ({
  messageIdListWithThumbup: [],
})

export const mutations = {
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
  async nuxtServerInit({dispatch}) {
    try {
      // return await Promise.all([
        await dispatch('configuration/fetchSiteConfig')
        await dispatch('configuration/fetchProfile')
        await dispatch('configuration/fetchProjectIntro')
        await dispatch('weather/fetchWeatherData')
      // ])
    } catch (error) {
      console.error(error)
      // .catch(err => Promise.reject(err))
    }

    
  },
}
