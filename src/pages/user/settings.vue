<template>
  <q-page class="text-center">
    <h3>User Settings</h3>
    <p>{{ count }}</p>
    <q-btn color="pink" label="Up" @click="setCount(true)" />
    <q-btn color="teal" label="Down" @click="setCount(false)" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('counter', ['getCount']),
    count () {
      return this.getCount
    }
  },
  methods: {
    ...mapActions('counter', ['setCount'])
  }
}
</script>
