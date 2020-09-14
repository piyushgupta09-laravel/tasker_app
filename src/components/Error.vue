<template>
  <q-banner v-if="hasErrors" inline-actions class="text-white bg-red rounded-borders">
    <q-list class="alert alert-danger">
      <q-item v-for="(v, k) in getErrors" :key="k">
        <q-item-section v-for="error in v" :key="error" class="text-sm">
          {{ error }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-banner>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['hasErrors', 'getErrors'])
  }
}
</script>

<style scooped>
.q-item {
  min-height: auto;
  padding: 2px;
}
</style>
