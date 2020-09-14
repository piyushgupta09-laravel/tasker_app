import axios from 'axios'
import { Notify } from 'quasar'

export default {
  /**
   * Every time app refreshes vuex state get lost,
   * so via this method we re-instiate the state,
   * as saved in localstorage of browser
   *
   * @param {*} state
   */
  retrieveAuth (state) {
    console.log('mutations@retrieveAuth')
    const token = JSON.parse(localStorage.getItem('auth'))
    if (token) {
      state.logged = true
      Object.assign(state.token, token)
      axios.defaults.headers.common.Authorization = 'Bearer ' + token.access_token
    } else {
      state.logged = false
    }
  },
  resetErrors (state) {
    console.log('mutations@resetErrors')
    state.status = ''
    state.statusText = ''
    state.valid = true
    state.errors = {}
  },
  /**
   * This method is responsible for actually persisting response data.
   * It's been called by promise return with response as param
   * @param {*} state
   * @param {*} authResponse
   */
  setResponse (state, authResponse) {
    console.log('mutations@setResponse')
    // Common for every response
    state.status = authResponse.status
    state.statusText = authResponse.statusText
    // Case 1 : Logout - 204
    if (authResponse.status === 204) {
      console.log('valid logout')
      state.logged = false
      localStorage.removeItem('auth')
      axios.defaults.headers.common.Authorization = 'none'
      this.$router.push('login')
      return
    }
    state.valid = authResponse.data.valid
    // Case 2 : Invalid Response
    if (!authResponse.data.valid) {
      console.log('invalid: ' + authResponse.status + ' ' + authResponse.statusText)
      Object.assign(state.errors, authResponse.data.errors)
      return
    }
    // Case 3 : Valid Signup - 201
    if (authResponse.data.valid && authResponse.status === 201) {
      console.log('valid signup')
      this.$router.push('login')
      return
    }
    // Case 4 : Valid Login - 202
    if (authResponse.data.valid && authResponse.status === 202) {
      console.log('valid login')
      state.logged = true
      Object.assign(state.token, authResponse.data.token)
      localStorage.setItem('auth', JSON.stringify(authResponse.data.token))
      axios.defaults.headers.common.Authorization = 'Bearer ' + authResponse.data.token.access_token
      this.$router.push('dashboard')
      return
    }
    // Case 5 : Valid Forgot - 200
    if (authResponse.data.valid && authResponse.status === 200) {
      console.log('valid forgot')
      Notify.create({
        timeout: 20000,
        type: 'info',
        message: authResponse.data.message
      })
      this.$router.push('login')
      return
    }
    // Any other case thats left
    Notify.create({
      timeout: 50000,
      type: 'negative',
      message: authResponse.status + ' Some un-catched error occured'
    })
  }
}
