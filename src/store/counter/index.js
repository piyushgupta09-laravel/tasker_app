const state = {
  count: 0
}

const mutations = {
  upCount (state) {
    state.count++
  },
  downCount (state) {
    state.count--
  }
}

const actions = {
  setCount ({ commit }, trigger) {
    if (trigger) {
      commit('upCount')
    } else {
      commit('downCount')
    }
  }
}

const getters = {
  getCount: state => {
    return state.count
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
