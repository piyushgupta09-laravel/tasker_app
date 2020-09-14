<template>
<q-page padding>
  <div class="container">
    <div class="column">
      <q-input
        class="col"
        v-model="email"
        type="email"
        label="Email"
        @keyup.esc="email = ''"
        @keypress.enter="forgot({ email: email })"
      />
    </div>
    <q-btn
      color="blue"
      label="Send Reset Password Link"
      class="full-width q-mt-md"
      @click="forgot({ email: email })"
    />
    <q-btn
      outline
      color="blue"
      to="/register"
      class="full-width q-mt-md"
      label="Create New Account"
    />
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'forgot',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions('auth', ['forgot'])
  }
}
</script>
