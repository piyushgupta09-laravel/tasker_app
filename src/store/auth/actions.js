import axios from 'axios'

// Api paths
const signup = '/auth/signup'
const login = '/auth/login'
const logout = '/auth/logout'
const forgot = '/auth/forgot'

export default {
  retrieveAuth ({ commit }) {
    commit('retrieveAuth')
  },
  resetErrors ({ commit }) {
    commit('resetErrors')
  },
  setResponse ({ dispatch, commit }, promise) {
    promise.then((response) => {
      dispatch('resetErrors').then(() => {
        commit('setResponse', {
          status: response.status,
          statusText: response.statusText,
          data: response.data
        })
      })
    }).catch(errors => {
      dispatch('resetErrors').then(() => {
        commit('setResponse', {
          status: errors.response.status,
          statusText: errors.response.statusText,
          data: errors.response.data
        })
      })
    })
  },
  async login ({ dispatch }, credentials) {
    dispatch('setResponse', axios.post(login, {
      email: credentials.email,
      password: credentials.password,
      remember_me: credentials.remember
    }))
  },
  async signup ({ dispatch }, credentials) {
    dispatch('setResponse', axios.post(signup, {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password
    }))
  },
  async forgot ({ dispatch }, credentials) {
    dispatch('setResponse', axios.post(forgot, {
      email: credentials.email
    }))
  },
  async logout ({ dispatch }) {
    dispatch('setResponse', axios.get(logout))
  }
}
