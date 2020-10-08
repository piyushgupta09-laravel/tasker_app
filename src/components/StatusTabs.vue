<template>
  <q-card flat>

    <q-tabs
      dense
      narrow-indicator
      align="justify"
      active-color="primary"
      indicator-color="primary"
      class="text-grey bg-grey-2"
      v-model="tab"
    >
      <q-tab @click="setStatusTab('add')" name="add" icon="add"
        content-class="text-primary" class="q-px-none" />
      <q-tab @click="setStatusTab('yet')" name="yet" label="Yet" />
      <q-tab @click="setStatusTab('on')" name="on" label="On" />
      <q-tab @click="setStatusTab('did')" name="did" label="Did" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="getStatusTab" animated>
      <q-tab-panel name="add">
        <add-task-form />
      </q-tab-panel>
    </q-tab-panels>

  </q-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    'add-task-form': () => import('components/Forms/AddTask')
  },
  methods: {
    ...mapActions('app', ['setStatusTab'])
  },
  computed: {
    ...mapGetters('app', ['getStatusTab']),
    tab: {
      get: function () {
        return this.getStatusTab
      },
      set: function (newValue) {
        this.setStatusTab(newValue)
      }
    }
  }
}
</script>
