import _ from 'lodash'

export const state = () => ({
  
  diggedIdList: [],
})

export const mutations = {
  pushDiggId(state, id) {
    if (!state.diggedIdList.includes(id) && id) {
      state.diggedIdList.push(id)
    }
  },
  pullDiggId(state, id) {
    const index = state.diggedIdList.indexOf(id)

    if (index > -1) {
      state.diggedIdList.splice(index, 1)
    }
  },
}
