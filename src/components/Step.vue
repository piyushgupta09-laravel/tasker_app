<template>
  <q-item tag="label" v-ripple>
    <!-- Step Checkbox -->
    <q-item-section side @click="toggleStepStatus">
      <q-icon v-if="step.completed === 1" name="check_circle_outline" color="green" />
      <q-icon v-else name="radio_button_unchecked" color="grey-5" />
    </q-item-section>
    <!-- Step Body -->
    <q-item-section @click="toggleStepStatus">
      <q-input
        clearable
        autogrow
        v-model="content"
        label="Edit Step"
        hint="Press enter to save & ecs to exit"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        @keyup.esc="editFeild = false"
        @keydown.enter="submitForm"
        v-if="editFeild"
      />
      <q-item-label v-else>{{ step.body }}</q-item-label>
    </q-item-section>
    <!-- Action Buttons -->
    <q-item-section side>
      <div>
        <q-icon
          name="edit"
          size="xs"
          color="green"
          class="q-mr-md"
          @click="editFeild = true" />
        <q-icon
          name="delete"
          size="xs"
          color="red-5"
          class="q-mx-none"
          @click="deleteStep({id: step.id})" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['step'],
  data () {
    return {
      content: this.step.body,
      editFeild: false
    }
  },
  methods: {
    ...mapActions('data', ['updateStep', 'deleteStep']),
    toggleStepStatus () {
      this.updateStep({
        type: 'completed',
        id: this.step.id,
        value: !this.step.completed
      })
    },
    submitForm () {
      this.editFeild = false
      this.updateStep({
        type: 'content',
        id: this.step.id,
        value: this.content
      })
    }
  }
}
</script>
