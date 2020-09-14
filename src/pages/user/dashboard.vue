<template>
  <q-page class="flex flex-center">
    <h3>User Dashboard</h3>
    <q-btn color="red" label="Logout" @click="logout" />
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
