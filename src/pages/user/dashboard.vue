<template>
  <q-page class="flex flex-center">
    <q-btn class="q-ma-md q-pa-lg" color="teal" label="Projects" to="/projects" />
    <q-btn class="q-ma-md q-pa-lg" color="pink" label="Profile" to="/profile" />
    <q-btn class="q-ma-md q-pa-lg" color="deep-purple" label="Settings" to="/settings" />
    <q-btn class="q-ma-md q-pa-lg" color="red" label="Logout" @click="logout" />
</q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
