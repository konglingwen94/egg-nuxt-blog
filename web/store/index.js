export const state = () => ({
  guestbookDiggIdList: [],
})

export const mutations = {
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
  nuxtServerInit({ commit },ctx) {
    console.log(ctx)
  },
}
