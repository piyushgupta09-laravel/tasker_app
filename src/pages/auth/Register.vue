<template>
  <q-page padding>
    <div class="container">
      <div class="column">

        <!-- Input Name -->
        <q-input
          dense
          clearable
          ref="name"
          class="col"
          v-model="form.name"
          type="text"
          label="Name"
          :rules="[
            val => !!val || '* Feild Required',
            val => val.length >= 4 || 'Name must be atleast 4 charactors',
          ]"
          lazy-rules
          @keyup.esc="form.name = ''"
        />

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
            val => !!val || '* Feild Required',
            val => val.length >= 4 || 'Name must be atleast 4 charactors',
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
            val => !!val || '* Feild Required',
            val => val.length >= 8 || 'Password length should be minimum 8 character',
          ]"
          lazy-rules
          @keyup.esc="form.password = ''">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <!-- Input Confirm -->
        <q-input
          dense
          counter
          ref="confirm"
          class="col"
          v-model="form.password_confirmation"
          type="password"
          label="Confirm Password"
          :rules="[val => !!val || '* Feild Required']"
          lazy-rules
          @keyup.esc="form.password_confirmation = ''"
          @keypress.enter="submitForm"
        >
          <template v-slot:append>
            <q-icon
              :name="(matched === 'untouch') ? 'remove' : (matched ? 'check' : 'error')"
              :color="(matched === 'untouch') ? 'grey' : (matched ? 'green' : 'red')"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <!-- Input Agree -->
        <q-toggle
          dense
          class="col q-mt-xs q-mb-xs"
          color="blue"
          v-model="accept"
          label="I accept the license and terms"
        />

      </div>

      <!-- Action Submit -->
      <q-btn
        color="blue"
        label="Create Account"
        class="full-width q-mt-md"
        @click="submitForm"
      />

      <!-- Route Login -->
      <q-btn
        flat
        color="blue"
        to="/login"
        class="full-width q-mt-md"
        label="Already Regesterd! Login Here"
      />

    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      isPwd: true,
      accept: false,
      errors: [],
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    matched () {
      if (this.form.password === '' || this.form.password_confirmation === '') {
        return 'untouch'
      } else {
        return this.form.password === this.form.password_confirmation
      }
    }
  },
  methods: {
    ...mapActions('auth', ['signup']),
    submitForm () {
      if (this.form.name === '' ||
          this.form.email === '' ||
          this.form.password === '' ||
          this.form.password_confirmation === ''
      ) {
        this.alert('Alert', 'Complete form')
        return
      }
      if (!this.accept) {
        this.alert('Alert', 'You should read and accept terms & condition')
        return
      }
      if (!this.matched) {
        this.alert('Alert', 'Confirm password not matched')
        return
      }
      // Submit Form
      this.signup({
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      })
    },
    alert (title, message) {
      this.$q.dialog({
        title: title,
        message: message
      })
    }
  }
}
</script>
