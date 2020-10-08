const state = {
  editFeild: false,
  statusTab: 'on',
  serverUrl: 'http://localhost:8000'
}

const mutations = {
  changeStatusTab (state, tab) {
    console.log('mutations@changeStatusTab::' + tab)
    state.statusTab = tab
  },
  toggleEditFeild (state) {
    console.log('mutations@toggleEditFeild::' + !state.editFeild)
    state.editFeild = !state.editFeild
  }
}

const actions = {
  setStatusTab ({ commit }, tab) {
    console.log('actions@setStatusTab::' + tab)
    commit('changeStatusTab', tab)
  },
  toggleEditFeild ({ commit }) {
    console.log('actions@toggleEditFeild')
    commit('toggleEditFeild')
  }
}

const getters = {
  getStatusTab: state => {
    console.log('getters@getStatusTab::' + state.statusTab)
    return state.statusTab
  },
  getServerUrl: state => {
    console.log('getters@getServerUrl::' + state.serverUrl)
    return state.serverUrl
  },
  isEditFeildActive: state => {
    console.log('getters@isEditFeildActive::' + state.editFeild)
    return state.editFeild
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
