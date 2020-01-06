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
  async nuxtServerInit({ commit }, ctx) {
    try {
      var result = await ctx.service.aboutus.fetchData()
    } catch (error) {
      return
    }
    commit('setAboutus', result)
  },
}
