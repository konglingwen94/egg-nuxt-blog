import Vue from 'vue'

export const state = () => ({
  diggCommentIdList: [],
  starIdList: [],
})

export const mutations = {
  addStarId(state, id) {
    if (!state.starIdList.includes(id)) {
      state.starIdList.push(id)
    }
  },
  removeStarId(state, id) {
    const index = state.starIdList.indexOf(id)

    if (index > -1) {
      state.starIdList.splice(index, 1)
    }
  },
  removeCommentId(state, id) {
    const index = state.diggCommentIdList.indexOf(id)

    if (index > -1) {
      state.diggCommentIdList.splice(index, 1)
    }
  },
  addCommentId(state, id) {
    if (state.diggCommentIdList.includes(id)) {
      return
    }

    state.diggCommentIdList.push(id)
  },
}
