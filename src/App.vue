<template>
  <div id="q-app">
      <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  mounted () {
    console.log('App@mounted')
    // Loading Bar
    this.$q.loadingBar.setDefaults({
      color: 'orange',
      size: '10px',
      position: 'bottom'
    })
    // Notification
    this.$q.notify.setDefaults({
      position: 'bottom',
      timeout: 5000,
      progress: true,
      color: 'deep-purple',
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    })
    this.retrieveAuth()
  },
  methods: {
    ...mapActions('auth', ['retrieveAuth'])
  }
}
</script>
