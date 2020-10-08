import { LoadingBar, Notify } from 'quasar'
import Vue from 'vue'
import axios from 'axios'

const debug = true

// Make axios available in all .vue files
Vue.prototype.$axios = axios

// Setting axios defaults
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common.Authorization = 'none'

// Added a request interceptor
axios.interceptors.request.use(function (config) {
  if (debug) {
    console.log(config)
    console.log('before request sent')
  }
  LoadingBar.start()
  return config
}, function (error) {
  if (debug) {
    console.log(error.response)
    console.log('request sent error')
  }
  LoadingBar.stop()
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (debug) {
    console.log(response)
    console.log('response received')
    Notify.create({
      timeout: 2000,
      type: 'positive',
      message: response.status + ' ' + response.statusText
    })
  }
  LoadingBar.stop()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (debug) {
    console.log(error.response)
    console.log('response error received')
    Notify.create({
      timeout: 2000,
      type: 'warning',
      message: error.response.status + ' ' + error.response.statusText
    })
  }
  LoadingBar.stop()
  return Promise.reject(error)
})
