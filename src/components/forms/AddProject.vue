<template>
  <q-dialog v-model="showForm">
    <q-card style="min-width: 350px">

      <q-card-section
        style="background-color: teal"
        class="flex justify-between">
        <div class="form-title">
          Create New Project
        </div>
        <q-btn flat color="white" @click="toggleForm">
          <q-icon name="close" />
        </q-btn>
      </q-card-section>

      <q-card-section class="q-px-lg q-pb-lg q-pt-none">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          headers="{'content-type': 'multipart/form-data'}">

          <q-input
            clearable
            class="q-mt-md"
            label="Project Name *"
            v-model="form.name" />

          <q-select
            clearable
            class="q-mt-md"
            label="Priority *"
            :options="options"
            v-model="form.priority" />

            <q-input
            clearable
            class="q-mt-md"
            label="Description"
            v-model="form.description" />

          <q-input
            clearable
            class="my-input q-mt-sm"
            label="Color"
            v-model="form.color">
            <template v-slot:before>
              <q-icon name="palette" size="md" :style="{color: form.color}" />
            </template>
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color
                    bordered
                    no-header
                    no-footer
                    class="my-picker"
                    default-view="spectrum"
                    v-model="form.color"
                    :default-value="form.color"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-file
            clearable
            class="q-mt-sm"
            label="Cover"
            accept=".jpg, image/*"
            @rejected="onRejected"
            @input="onInput"
            v-model="selectedFile">
            <template v-slot:before>
              <q-avatar v-if="selectedFile">
                <img :src="filePreview">
              </q-avatar>
              <q-icon v-else size="md" name="insert_photo" />
            </template>
            <template v-slot:append>
              <q-icon name="attach_file" size="sm" style="transform: rotate(45deg);" />
            </template>
          </q-file>

          <div class="q-mt-lg" align='right'>
            <q-btn outline label="Reset" @click="onReset" type="reset" color="teal-8" />
            <q-btn label="Submit" type="submit" color="teal" class="q-ml-md" />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {},
      filePreview: null,
      selectedFile: null,
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
    ...mapGetters('data', ['showForm'])
  },
  methods: {
    ...mapActions('data', ['toggleForm', 'createProject']),
    /**
     * It triggers on file selected
     * then it reads file from users system
     * and convert that file to base64 image
     */
    onInput (image) {
      console.log('onInput')
      this.filePreview = URL.createObjectURL(image)
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = e => {
        this.form.cover = e.target.result
      }
    },
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    onSubmit () {
      console.log('onSubmit')
      this.createProject({
        name: this.form.name,
        description: (this.form.description) ? this.form.description : 'no description available',
        priority: this.form.priority.value,
        cover: this.form.cover,
        color: this.form.color,
        returnwithdata: true
      })
      this.onReset()
      this.toggleForm()
    },
    onReset () {
      console.log('reset form')
      this.form = {}
      this.selectedFile = ''
      this.filePreview = ''
    }
  }
}
</script>
