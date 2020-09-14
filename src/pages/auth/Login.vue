<template>
  <q-page padding>
    <div class="container">
      <div class="column">

        <!-- Input Email -->
        <q-input
          dense
          clearable
          ref="email"
          class="col"
          v-model="form.email"
          type="email"
          label="Email"
          :rules="[
            val => !!val || '* Feild Required'
          ]"
          lazy-rules
          @keyup.esc="form.email = ''"
        />

        <!-- Input Password -->
        <q-input
          dense
          counter
          ref="password"
          class="col"
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          :rules="[
            val => !!val || '* Feild Required'
          ]"
          lazy-rules
          @keyup.esc="form.password = ''"
          @keydown.enter="submitForm">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <!-- Input Remember -->
        <q-toggle
          dense
          class="col q-mt-xs q-mb-xs"
          color="blue"
          v-model="form.remember"
          label="Remember on this device"
        />

      </div>

      <!-- Action Submit -->
      <q-btn
        color="blue"
        label="Login"
        class="full-width q-mt-md"
        @click="submitForm"
      />

      <!-- Route Forget -->
      <q-btn
        flat
        to="/forgot"
        class="full-width q-mt-md text-caption"
        label="Forgot Password"
      />

      <!-- Route Register -->
      <q-btn
        color="white"
        text-color="blue"
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
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: '',
        remember: false
      },
      isPwd: true
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submitForm () {
      if (this.form.email === '' || this.form.password === '') {
        return this.showNotif('You need to provide your credentials to perform login')
      }
      this.login(this.form)
    },
    showNotif (message) {
      this.$q.notify({
        type: 'warning',
        message: message
      })
    }
  }
}
</script>
