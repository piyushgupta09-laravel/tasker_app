import { LoadingBar } from 'quasar'
import Cookie from '../cookies/index'
import axios from 'axios'

const state = {
  token: {
    access_token: '',
    expires_in: 0,
    refresh_token: '',
    token_type: ''
  }
}

const mutations = {
  setAuth (state, token) {
    Object.assign(state.token, token)
    LoadingBar.stop()
    console.log('mutations@setAuth')
  },
  removeAuth (state) {
    state.token = {}
    LoadingBar.stop()
    console.log('mutations@removeAuth')
  }
}

const actions = {
  async login ({ commit }, credentials) {
    LoadingBar.start()
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8000/oauth/token',
      data: {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'FPDQOuGPvQuOmT3iz6v5oUtG05EFivTNwE5NMSZ9',
        username: credentials.email,
        password: credentials.password
      },
      headers: {
        accept: 'application/json',
        content_type: 'application/json'
      }
    })
    // LocalStorage
    localStorage.setItem('token', response.data)
    // BrowserCookie
    Cookie.setItem('isLoggedIn', 'true')
    Cookie.setItem('accessToken', response.data.access_token)
    // VuexStore
    commit('setAuth', response.data)
  },
  async register ({ commit }, credentials) {
    LoadingBar.start()
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8000/oauth/token',
      data: {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'FPDQOuGPvQuOmT3iz6v5oUtG05EFivTNwE5NMSZ9',
        username: credentials.email,
        password: credentials.password
      },
      headers: {
        accept: 'application/json',
        content_type: 'application/json'
      }
    })
    // LocalStorage
    localStorage.setItem('token', response.data)
    // BrowserCookie
    Cookie.setItem('isLoggedIn', 'true')
    Cookie.setItem('accessToken', response.data.access_token)
    // VuexStore
    commit('setAuth', response.data)
  },
  async logout ({ state, commit }) {
    LoadingBar.start()
    // ApiServer
    // await axios({
    //   method: 'post',
    //   url: 'http://localhost:8000/api/logout',
    //   headers: {
    //     accept: 'application/json',
    //     content_type: 'application/json',
    //     authorization: state.token.access_token
    //   }
    // })
    // LocalStorage
    localStorage.removeItem('token')
    // BrowserCookie
    Cookie.removeItem('isLoggedIn')
    Cookie.removeItem('accessToken')
    // VuexStore
    console.log('action@logout')
    commit('removeAuth')
  },
  retrieveAuth ({ commit }) {
    LoadingBar.start()
    console.log('action@retrieveAuth')
    commit('setAuth', localStorage.getItem('token'))
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
