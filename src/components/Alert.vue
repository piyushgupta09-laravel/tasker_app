<template>
  <q-dialog>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title || 'Alert' }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">{{ message || 'Somthings not right' }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  props: ['title', 'message']
}
</script>
