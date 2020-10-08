<template>
  <div class="q-px-md">
    <q-input
      clearable
      autogrow
      v-model="value"
      :label="'Edit ' + label"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
      @keyup.esc="toggleEditFeild"
      @keydown.enter="submitForm"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['id', 'label', 'data'],
  data () {
    return {
      value: this.data
    }
  },
  methods: {
    ...mapActions('app', ['toggleEditFeild']),
    ...mapActions('data', ['updateProject']),
    submitForm () {
      console.log('SUBMITTING FORM')
      this.updateProject({
        type: this.label.toLowerCase(),
        id: this.id,
        description: this.value
      })
      this.toggleEditFeild()
    }
  }
}
</script>

<style>

</style>
