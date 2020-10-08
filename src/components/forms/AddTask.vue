<template>
  <q-form @submit="onSubmit" @reset="onReset">

    <q-input
      dense
      clearable
      label="Title"
      placeholder="What needs to be done ?"
      v-model="form.name"
    />

    <q-select
      dense
      clearable
      label="Priority *"
      :options="options"
      v-model="form.priority"
    />

    <!-- <q-input
      dense
      autogrow
      clearable
      label="Description"
      placeholder="Some additional information"
      v-model="form.description"
    /> -->

    <div v-if="!update">

      <q-input
        dense
        autogrow
        clearable
        label="Step"
        placeholder="Its a most specific individual action to be taken"
        v-for="(step, index) in steps"
        :key="step"
        v-model="form.steps[index]"
      >
        <template v-slot:before>
          <q-badge outline color="teal" text-color="black" :label="(index + 1)" />
        </template>
      </q-input>

      <q-btn
        flat
        padding="xs"
        align="right"
        color="primary"
        class="full-width"
        label="Add Step"
        @click="steps++"
      />

    </div>

    <div class="q-mt-lg" align='right'>
      <q-btn outline label="Reset" @click="onReset" type="reset" color="teal-8" />
      <q-btn label="Submit" type="submit" color="teal" class="q-ml-md" />
    </div>

  </q-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      update: false,
      steps: 1,
      form: {
        steps: []
      },
      options: [
        {
          label: 'Least',
          value: 1
        },
        {
          label: 'Regular',
          value: 2
        },
        {
          label: 'Remember',
          value: 3
        },
        {
          label: 'Important',
          value: 4
        },
        {
          label: 'Urgent',
          value: 5
        }
      ]
    }
  },
  computed: {
    ...mapGetters('data', ['project', 'task']),
    ...mapGetters('app', ['getStatusTab'])
  },
  mounted () {
    if (this.task !== {}) {
      this.update = true
      this.form.name = this.task.title
      this.form.priority = this.task.priority
    }
  },
  methods: {
    ...mapActions('data', ['createTask', 'updateTask', 'unsetTask']),
    ...mapActions('app', ['setStatusTab']),
    onSubmit () {
      console.log('onSubmit')
      if (this.update) {
        this.updateTask({
          id: this.task.id,
          value: {
            name: this.form.name,
            priority: this.form.priority.value
          }
        })
      } else {
        this.createTask({
          name: this.form.name,
          priority: this.form.priority.value,
          steps: this.form.steps,
          project: this.project.id
        })
      }
      this.onReset()
    },
    onReset () {
      console.log('reset form')
      this.form = {
        steps: []
      }
    }
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    this.unsetTask()
    if (this.getStatusTab === 'add') {
      this.setStatusTab('on')
    }
  }
}
</script>
