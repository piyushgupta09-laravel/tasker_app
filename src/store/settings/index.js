import { LocalStorage } from 'quasar'

const state = {
  settings: {
    timeFormat: false,
    singleList: false
  }
}

const mutations = {
  /**
   * From 'getSettings@action'
   *
   * Replace old settings bject with given one
   * @param settings : given settings object
   */
  setSettings (state, settings) {
    Object.assign(state.settings, settings)
  },
  /**
   * Responsible for updating store state
   *
   * @param value : boolean
   */
  changeTimeFormat (state, value) {
    state.settings.timeFormat = value
  },
  changeSingleList (state, value) {
    state.settings.singleList = value
  }
}

const actions = {
  /**
   * On reload of applicaction it will, look in to the
   * browsers local storage and get re-instate any settings
   * if any were present, i.e.
   * where saved by user in any preivous session.
   *
   * From: 'mounted@App.vue'
   * To: 'saveSettings@mutations'
   * @param { commit }
   */
  getSettings ({ commit }) {
    const settings = LocalStorage.getItem('settings')
    if (settings) {
      commit('setSettings', settings)
    }
  },
  /**
   * Responsible to 2 things :
   * 1) Call mutation to update state
   * 2) Update local storage also
   *
   * @param value : boolean
   */
  changeTimeFormat ({ commit, dispatch }, value) {
    commit('changeTimeFormat', value)
    dispatch('saveSettings')
  },
  changeSingleList ({ commit, dispatch }, value) {
    commit('changeSingleList', value)
    dispatch('saveSettings')
  },
  /**
   * Called every time any change in settings occured,
   * to persist the updated settings object in storage.
   */
  saveSettings ({ state }) {
    LocalStorage.set('settings', state.settings)
  }
}

const getters = {
  /**
   * Returns the settings object
   */
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
